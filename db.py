import random, re, datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

from flask import jsonify

client = MongoClient()
db = client['datab'] 		#database called datab
users = db['users_fb']   		#collection called users
stories = db['stories'] 	#collection called stories

def userexists(username):
        return 1 == (users.find({'name':username})).count()

def idexists(id):
        return 1 == (users.find({'id':id})).count()

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

def adduser(display, id,email):
        users.insert([{'display':display,'id':id,'email':email}])

def updatedisplay(id, display):
        users.update({'id':id}, {'$set':{'display':display}})

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
        stories.update({"_id":ObjectId(parent)}, {'$set': {'children':[str(id)]}})
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

# recursively replace the document id's with actual data
def get_children_data(node):
    # jsonify doesn't know how to convert ObjectId's,
    # so we have to do that manually.
    node["_id"] = str(node["_id"])
    if node["parent"]:
        node["parent"] = str(node["parent"])
    if node["children"]:
        for i in range(0, len(node["children"])):
            node["children"][i] = s_get(node["children"][i])
            get_children_data(node["children"][i])


def s_getall():		# return list of all STORIES (first parent nodes only)
    temp = stories.find({"parent":None})
    #temp = stories.find()
    result = [x for x in temp]
    print result
    for each in result:
        get_children_data(each)

    return result

def s_get(i):	#get story by ObjectId
    temp = stories.find({"_id":ObjectId(i)})
    result = [x for x in temp][0]
    get_children_data(result)
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
