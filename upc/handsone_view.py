import pyexcel as p
from django.shortcuts import render, redirect
from pyexcel._compact import OrderedDict, append_doc, zip_longest
from pyexcel.core import _split_keywords
import pyexcel.internal.core as sources


from AllFoamTech.settings import BASE_DIR
import pyexcel.docstrings as docs

from slp.models import Admin


@append_doc(docs.SAVE_BOOK_AS)
def save_book_as(**keywords):
    """
    Save a book from a data source to another one
    """
    s = p.iget_book(file_name=f'{BASE_DIR}/slp/media/UPC_data_update_sheet.xlsx')
    dest_keywords, source_keywords = _split_keywords(**keywords)
    book = s
    return sources.save_book(book, **dest_keywords)


def handsone_view(request):
    try:
        name = Admin.objects.get(id=int(request.session['aid'])).full_name.capitalize()

        s = p.iget_book(file_name=f'{BASE_DIR}/slp/media/UPC_data_update_sheet.xlsx')
        content = save_book_as(
            models=s,
            dest_file_type='handsontable.html',
            dest_embed=True)
        print(content, type(content))
        content.seek(0)
        return render(
            request,
            # 'custom-handson-table.html',
            'demo_handson.html',
            {
                'handsontable_content': content.read(),
                'name': name
            })
    except Exception as e:
        print('Excpetion in handson view : ', e)
        return redirect('login_error')
