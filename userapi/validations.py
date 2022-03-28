from datetime import datetime
import hashlib

from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response

from jake import get_base64_hashed
from slp import models


def get_request_data(data, argslist):
    """
    To get users data from request. This method is called everytime when params passed with request.
    """
    dict_keys = data.keys()
    ans_dict = {}
    try:
        ls = ['full_name', 'email', 'password', 'phone', 'company_name', 'address']
        for l in ls:
            if l not in argslist:
                return f'0 {l} is mandatory'
        for key in argslist:
            if key in dict_keys:
                param = data.get(key)
                ans_dict[key] = param

                if key == 'email' and models.User.objects.filter(email=param).exists():
                    return 'email already exists'
                if key == 'address':
                    if param is None:
                        return f'0 {key} is mandatory'
                    k = ['add_line1', 'add_line2', 'city', 'state', 'country', 'zip_code']
                    for x in k:
                        if x not in param.keys():
                            return f'0 {x} is mandatory'
                    obj = models.Address.objects.create(add_line1=param.get("add_line1"),
                                                        add_line2=param.get("add_line2"), city=param.get("city"),
                                                        state=param.get("state"), country=param.get("country"),
                                                        zip_code=param.get("zip_code"))
                    obj.merchant_id = obj.id
                    obj.save()
                    ans_dict[key] = obj
                if key == 'referred_by':
                    try:
                        referred_by = models.User.objects.filter(referral_code=param)
                        # print('refer : ', referred_by)
                        referred_by = referred_by[0].id
                        ans_dict[key] = referred_by
                    except Exception as e:
                        print(e)
                        return "Invalid referral code"
                else:
                    pass
            else:
                return f'0 {key} is mandatory'
    except Exception as e:
        print('Exception : ', e)
    print(ans_dict)
    return ans_dict


def get_user_obj(token):
    """
    To get users object from request. Also give token_list for UserLogin.
    """
    usrs = models.User.objects.all()
    # print(usrs)
    token_list = []
    for user in usrs:
        try:
            # print('iser:', user)
            dv = user.device
            # print('dv:', dv)
            for x in dv:
                # print('x : ', x)
                if isinstance(x.access_token, str):
                    token_list.append(x.access_token)
                    if x.access_token == token:
                        user_obj = user
        except Exception as e:
            print(e)
            return "Invalid access token"
    return user_obj, token_list


def check_request(request, args):
    try:
        data = request.data
        if args == 'token':
            ans = data.get('access_token')
        if args == 'keys':
            ans = data.keys()
        if args == 'email':
            ans = data.get('email')
        # print(ans)
    except Exception as e:
        print(e)
        return '400'
    return data, ans


def hash_password(password):
    iter = 2000
    salt = "random_salt"
    hashed_pass = get_base64_hashed(password, salt, iter, hashlib.sha256)
    return hashed_pass


def user_lifetime_points(user):
    # print("user : ", user)
    available_points = user.points

    rewards = models.UserRewards.objects.all().filter(user_id=user, points_type="Debit")

    lifetime_points = available_points
    for reward in rewards:
        lifetime_points += reward.reward_points

    return lifetime_points

# def check_duration_in_years_and_add_extra_points_to_existing_user(user, user_rewards, points):
#     creat = user.created_at
#     start = creat.strftime('%Y-%m-%d %H:%M:%S')
#     start = datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
#     print(start, type(start))
#
#     now = datetime.now()
#     ends = now.strftime('%Y-%m-%d %H:%M:%S')
#     ends = datetime.strptime(ends, '%Y-%m-%d %H:%M:%S')
#     print(ends, type(ends))
#
#     diff = abs(ends - start)
#     print(diff.total_seconds() / (3600 * 24 * 365))
#     duration_in_year = diff.total_seconds() / (3600 * 24 * 365)
#
#     if duration_in_year < 1:
#         admin = models.Admin.objects.get(id=1)
#         old_user_points = points * (admin.settings.percentage_of_new_user_referral_points / 100)
#         old_referral_user = models.User.objects.get(id=user.referred_by)
#         old_referral_user.points += old_user_points
#
#         models.UserRewards.objects.create(user_id=old_referral_user, qr_code=user_rewards.qr_code,
#                                           reward_name="Points by Scan Product from referred user", points_type="Credit",
#                                           reward_type="Referral Points", reward_points=old_user_points,
#                                           product_activation_questions=user_rewards.product_activation_questions,
#                                           qr_status="Completed")
#
#         not_msg = f"Congratulations, You have earned {int(old_user_points)} points from your referred user " \
#                   f"{user.full_name} of their scan qr activity."
#         models.Notification.objects.create(user_id=old_referral_user, points=old_user_points,
#                                            notification_msg=not_msg)
#         old_referral_user.save()


def validate_file_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    print("ext===>",ext)
    valid_extensions = ['.mp4']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'Unsupported file extension.')


def find_param(ls, param):
    for dc in ls:
        print(dc, param)
        try:
            if param in dc:
                # print('dccccc : ', dc[param])
                return dc[param]
            for k, v in dc.items():
                if isinstance(v, dict):
                    # print(v)
                    ans = find_param(v, param)
                    if ans is not None:
                        return ans
                elif isinstance(v, list):
                    for x in v:
                        if isinstance(x, dict):
                            ans = find_param(x, param)
                            if ans is not None:
                                return ans
        except Exception as e:
            print("\n\nException :-> ", e)
            return None


def define_html_paragraph(msg):
    if len(msg) > 25:
        ls = msg.split(' ')
        length = 0
        arr_index = 0
        for x in ls:
            if length < 25:
                length += len(x)
                arr_index += 1
        str_splits_at = length + arr_index

        append = msg[:str_splits_at] + "<br>" + define_html_paragraph(msg[str_splits_at:])

        print("html_msg : ", append)
        return append
    else:
        return msg
