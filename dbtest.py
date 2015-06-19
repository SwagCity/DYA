#db test

import db

def run():
    x = db.s_add("The Store","One fine day, Mark goes to the store.", None, {"author":"Bob","tags":["retail","adventure"]})
    child = db.s_add("Crap", "The store was full of crap", str(x), {"author":"Dylan","tags":["retail","adventure","crap"]})
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
    
def setup():
    new = db.s_add("Untitled", "Write your story here!", None, {})

    x = db.s_add("The Store","One fine day, Mark goes to the store.", None, {"author":"Bob","tags":["retail","adventure"]})
    child = db.s_add("Crap", "The store was full of crap", str(x), {"author":"Dylan","tags":["retail","adventure","crap"]})

    
    hobbit = db.s_add("The Hole in the Ground", "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.", None, { "author" : "JRR" })
    secondlevel1 = db.s_add("A Perfectly Round Door", "It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened to a tube-shaped hall like a tunnel: a very comfortable tunnelwithout smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors.", str(hobbit), {"author":"JRR"})
    thirdlevel1 = db.s_add("The Hill", "The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the poeple for many miles round called it - and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathroom, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden and meadows beyond, sloping down to the river.", str(secondlevel1), {"author":"JRR"})
    secondlevel2 = db.s_add("Empty.", "Just kidding, the hole was actually empty.", str(hobbit), {"author":"dyadevteam"})
    thirdlevel2 = db.s_add("The End", "The end.", str(secondlevel2), {"author":"dyadevteam"})



if __name__ == '__main__':
    setup()
