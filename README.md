



//TODO (Overal)
1. Clear all the boiler plate nonsense //DONE
2. Set up structure of folders as i like //DONE
3. Set up context for auth //DONE
4. Set up context for theme 
5. Set up custom fetch (handle JWT expiration)

6. Design UX general (color scheme, layout)
7. Define "pages" we need, or make a SPA
-
- login page design
    functional
- sign up page design
    functoinal
- set user page design
    functional

//TODO (no order of sequence)
- search bar and search results page (low priority)
- messaging and logic
    - UI arrangement of messaging
    
    - who can you message 
    - add DM inside profile page
    - socket programming logic, please look into messaging project
    - loading messages
    - 
    - frontend send message
    - backend


//README settled stuff
-> only show chats you have message with, plus button redirect to find user page
-> display a list of chats
-> click on chats -> redirect the chat page 
-> side bar empty
-> chat is a component or a page? 
-> in the name of spa, make it a component
-> from the list of chats 
-> on click active chat
-> we set the chat as props and update according ly 
    
- settings (auth issues, themee)
- setting expired JWT mess,and refresh tokens logic

- search user -> store the search query inside the URL (low prority)


//BUGS
1. navigate(-1) will bring the user to a whole differen domain if the user was on a different website and access a page that has a backNav button



//TODO -> alot of refactoring to do for all auth pages
//the style file is one super long speghetti code



important pages:
- profile
- create post //DONE

    ? modal or page or part of the feed -> part of feed.
    - basically a big form
    - bunch of validation
    - react query usemutation (!update feed)


- view post  //DONE
    - show all comments
    - creat a comment
    - reply to a comment
    - like comment(s)




//README considerations
1. change backend to fetch users based on 


Goals for this project
-> 
-> learn how to use  framer motion
-> learn how to do a notification or toaster thingy
-> make nice modals when needed


//README 
priority 
HIGH
MED
LOW
- implement light/dark theme toggle


Keep tract
flex grow side-bar vs content
1:5
flex grow content-main vs content side:
4:1

there for its 1:3:1