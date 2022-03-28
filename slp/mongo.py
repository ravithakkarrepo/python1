import pymongo

mongoClient = pymongo.MongoClient('mongodb://localhost:27017/') # Connection to the MongoDB Server
db = mongoClient['slp_development'] # Connection to the database
merchant_collection = db['slp_merchant'] # Merchant Collection
admin_collection = db['slp_admin'] # Admin Collection
product_collection = db['slp_product'] # Product Collection
batch_collection = db['slp_batch'] # Batch Collection
video_collection = db['slp_video'] # Video Collection
user_collection = db['slp_user'] # User Collection
address_collection = db['slp_address'] # Address Collection
banner_collection = db['slp_banner'] # Banner Collection
qr_collection = db['slp_QRCode'] # QR Collection
Admin_Cms = db['slp_admin_cms']