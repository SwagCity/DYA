import random, re, datetime
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256
from bson.objectid import ObjectId

client = MongoClient()
db = client['datab'] 		#database called datab
users = db['users']   		#collection called users
stories = db['stories'] 	#collection called stories

def authenticate(username,password):
        result = users.find({'name':username})
        temp = result[0]['pw']
        return pbkdf2_sha256.verify(password, temp)

def userexists(username):
        return 1 == (users.find({'name':username})).count()

def emailexists(email):
        return 1 == (users.find({'email':email})).count()

def getcontacts(username):
        res = users.find({'name':{'$not':re.compile(username)}},{"_id":False})
        info = [x for x in res]
        return info

def getprofile(username):
        res = users.find({'name':username},{"_id":False})
        info = [x for x in res]
        return info

def updatepw(username,newpwd):
        users.update({'name':username},{'$set':{'pw':newpwd}}, upsert=False, multi=False)

def adduser(display, username,email,pw):
        hash = pbkdf2_sha256.encrypt(pw, rounds=100000, salt_size=16)
        users.insert([{'disp':display,'name':username,'email':email,'pw':hash}])

def s_add(title, text, parent, meta):
    author = ""
    tags = []
    time = str(datetime.datetime.now())
    if "author" in meta:
        author = meta["author"]
    if "tags" in meta:
		tags = meta["tags"]

    s = {'title':title,'author':author,'text':text,'tags':tags,'children':[], 'time':time}
    s['parent'] = parent

    stories.insert(s)
    temp = stories.find(s)

    id = [x for x in temp][0]["_id"]
    if (parent):  #notify the parent to update its children!!
        stories.update({"_id":ObjectId(parent)}, {'$set': {'children':[id]}})
    return id

def s_edit(i, title, text, parent, meta): #editing node text
    update = {}
    if title:
        update["title"] = title
    if text:
        update["text"] = text
    if parent:
        old_parent = s_get(i)["parent"]
        stories.update({"_id":ObjectId(old_parent)}, {'$set': {'children':[]}})
        update["parent"] = parent
	if "author" in meta:
		update["author"] = meta["author"]
	if "tags" in meta:
		update["tags"] = meta["tags"]

	stories.update({"_id":ObjectId(i)}, {'$set': update})

def s_delete(i):	# deletes either a node or a story AND ALL OF ITS CHILDREN
    for x in s_get(i)['children']:
        s_delete(x)
    stories.update({"_id":i},{'$set': {'children':[]}})
    old_parent = s_get(i)["parent"]
    stories.update({"_id":ObjectId(old_parent)}, {'$set': {'children':[]}})
    stories.remove({"_id":ObjectId(i)})

def s_getall():		# return list of all STORIES (first parent nodes only)
    temp = stories.find({"parent":None})
    #temp = stories.find()
    result = [x for x in temp]
    return result

def s_get(i):	#get story by ObjectId
    temp = stories.find({"_id":ObjectId(i)})
    result = [x for x in temp][0]
    return result

def s_search(term, context):
    if context == None:
        temp = stories.find( {'$or':[
            { 'title': { '$regex': term } },
            { 'text': { '$regex': term } } ]})

    else:
        temp = stories.find({ context : { '$regex': term } })

    result = [x for x in temp]
    return result

'''
def invalidpost(title, content):
	conn = Connection()
	db = conn['jsdt_blog']
	valid = (0 == (db.jsdt_blog.find({'title':title})).count())
	valid = valid and len(content) > 0 and len(title)>0

	return not(valid)

def invalidcomment(comment):
	return len(comment)==0

def addpost(title, username,content):
	conn = Connection()
	db = conn['jsdt_blog']
	now = datetime.datetime.now()
	db.jsdt_blog.insert([{'title':title,'author':username,'content':content, 'comments':[], 'time':[now.month,now.day,now.year,now.hour,now.minute]}])

def addcomment(title, username,comment):
	conn = Connection()
	db = conn['jsdt_blog']
	now = datetime.datetime.now()
	newcomment = [comment,username,[now.month,now.day,now.year,now.hour,now.minute]]
	print newcomment
	print title
	db.jsdt_blog.update({'title':title},{'$push':{'comments':newcomment}})

def votepost(title,points):
	conn = Connection()
	db = conn['jsdt_blog']
	db.jsdt_blog.update({'title':title},{'$inc':{'points':points}})
'''
