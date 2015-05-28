import random, re, datetime
from pymongo import MongoClient

client = MongoClient()
db = client['swag'] 		#database called swag
users = db['users']   		#collection called users
stories = db['stories'] 	#collection called stories
#db.swag.drop()

def authenticate(username,password):
	#print [x for x in users.find()]
	return 1 == (users.find({'name':username,'pw':password})).count()

def userexists(username):
	return 1 == (users.find({'name':username})).count()

def emailexists(email):
	return 1 == (users.find({'email':email})).count()

def getcontacts(username):
	res = users.find({'name':{'$not':re.compile(username)}},{"_id":False})
	info = [x for x in res]
	return info
'''
def getblog(username):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'name':{'$not':re.compile(username)}},{"_id":False})
	info = [x for x in res]
	return reversed(info)

def getblogcontent(title):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'title':title},{"_id":False})
	return res
'''
def getprofile(username):
	res = users.find({'name':username},{"_id":False})
	info = [x for x in res]
	return info
'''
def getposts(username):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'author':username},{"_id":False})
	info = [x for x in res]
	return reversed(info)
'''
def updatepw(username,newpw):
	users.update({'name':username},{'$set':{'pw':newpw}})

def adduser(display, username,email,password):
	users.insert([{'disp':display,'name':username,'email':email,'pw':password}])

def s_add(title, text, parentID, meta):
	author = ""
	tags = []
	if "author" in meta:
		author = meta["author"]
	if "tags" in meta:
		tags = meta["tags"]

	if (parentID = None):	# if first node of story
		stories.insert({'title':title,'author':author,'text':text,'tags':tags,'children':[], 'parent':None})
	else:					# not the first node of story
		stories.insert({'title':title, 'author':author, 'text':text, 'tags':tags, 'children':[], 'parent':parentID })

def s_edit(i, title, text, parentID, meta): #editing node text
	update = {}
	if title:
		update["title"] = title
	if text:
		update["text"] = text
	if parentID:
		update["parent"] = parentID
	if "author" in meta:
		update["author"] = meta["author"]
	if "tags" in meta:
		update["tags"] = meta["tags"]

	stories.update({"_id":ObjectId(i)}, update)

def s_delete(id):	# deletes either a node or a story
	pass

def s_getall():		# return list of all stories
    temp = stories.find({"parent":None})
	result = [x for x in temp]
	return result

def s_get(i):	#get story by Object_Id
    temp = stories.find({"_id":ObjectId(i)})
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

# if __name__ == '__main__':
# 	setup()
