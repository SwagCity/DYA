#db test

import db

def run():
    x = db.s_add("The Store","One fine day, Mark goes to the store.", None, {"author":"Bob","tags":["retail","adventure"]})
    print x
    print db.s_get(x)
    print ""
    print "update"
    db.s_edit(x, "The Store is a Lie", None, None, [])
    print db.s_get(x)

    y = db.s_add("Walking in the store","He finds a wide variety of goods", x, {"author":"Mark","tags":["retail","adventure"]})
    print ""
    print "SEARCH"
    print db.s_search("store","title")
    '''
    print db.s_getall()
    db.s_delete(y)
    '''
    print ""
    print "ALL"
    print db.s_getall()
    


if __name__ == '__main__':
    run()
