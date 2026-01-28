# :iphone: Dalibird #

Is a Twitter style social platform for DALI Lab members to share updates, discover each other, and stay connected across projects and terms. Built as my solution to the DALI Lab 2026 Social Media Challenge.

---

## Features ##
Auth - Register and login with JWT based sessions
Feed - View posts from all DALI members sorted by most recent
Create Post - Share updates with the "Peep" button(only logged users can post)
Likes - Like posts from other members
Explore - See all DALI members with role badges
Search - Find members by name

---

## How to Use ##
1. Run site locally (see instructions below)
2. Create an account and log in
3. View your feed and what DALI members are posting
4. Peep your own updates
5. Like post
6. Find all members on the explore page

---

# Setup Instructions #

## Prerequisites ##
- **Node & NPM Installed**
- Mac: `brew install node`

## Installation ##

1. **Clone this repo**
```bash
   git clone https://github.com/your_github_username/dalibird.git
   cd dalibird
```

2. **Install backend dependencies**
```bash
   cd backend
   npm install
```

3. **Generate your JWT secret**
```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

4. **Create a `.env` file in the backend folder**
```env
   JWT_SECRET=paste-your-generated-key-here
   PORT=3000
   NODE_ENV=development
```

5. **Start backend server**
```bash
   npm start
```

6. **In a new terminal, install frontend dependencies**
```bash
   cd frontend
   npm install
```

7. **Start the frontend**
```bash
   npm run dev
```

8. **Visit the link displayed in your terminal**

## Test Account ##

Create your own account on the sign up page, or use:
- **Email:** `Charlie@gmail.com`
- **Password:** `1234`

---

## Learning Journey ##

### Inspiration For This Project ###
Two weeks before the deadline, I knew almost nothing about web dev. I chose the social media challenge anyway because it scared me the most and because I knew I'd learn the most by building something I actually wanted to finish.

I gave myself a simple rule: two hours of coding every day, no matter what. Day 1 was HTML and CSS basics. By Day 4, I was setting up Express servers and learning why DALI loves the MERN stack. By Day 10, I was debugging JWT authentication and learning what "debouncing" means when users spam a like button. By Day 12, I had Dalibird.

The process was messy. I mixed up syntax between languages. I spent an entire morning debugging an API route only to discover I'd forgotten to send a response back to the browser. I watched YouTube tutorials at 1.5x speed, lived on Stack Overflow, and went to DALI office hours to ask questions that probably seemed basic. But every day, the app got a little better and I understood a little more.

What kept me going was the feeling when something finally worked. The frontend rendering correctly. The backend and frontend communicating for the first time. That feeling never got old it just made me want to build more.

### Potential Impact ###
DALI has over 100 members across different roles and project teams. It's easy to work alongside someone for a term without knowing their background, interests, or what they're working on outside your shared project.

Dalibird gives members a low friction way to discover who's in the lab. The Explore page lets you browse everyone with their role within the lab. The feed shows what people are thinking about and working on. 

### New Technology Learned ###
I learned the MERN stack or what I call 'MERN lite,' since I used JSON file storage instead of MongoDB. This meant learning HTML, CSS, JavaScript, React, Express, Node.js, and JWT authentication in about two weeks.

Why did I choose this stack? DALI's website says they love the MERN stack. If I'm going to contribute to real projects in the lab, I wanted to learn the tools I'd actually be working with. Also, Javascript on both frontend and backend meant I could focus on one language instead of having to handle multiple syntaxes.

Why JSON instead of MongoDB? Because I wanted to master the fundamentals first: API design, REST conventions, routing, the request and response cycle without getting stuck on database configuration. JSON lets anyone who review this project to run immediately without setup. The way I structured my data layer means I can swap in MongoDB by only changing how I read and write data, not my routes or frontend.

### Technologies I learned ###
React - Component based architecture, useState, useEffect, conditional rendering
Express.js - REST API endpoints, middle, request and response handling
JWT auth - Token generation, verification, protected routes, bcrypt password hashing
Session storage - Chose this over localStorage after learning more about security tradeoffs
React Context - Built AuthContext to manage auth state across different components 

### Resources I Particularly Found Helpful ###
1. HTML and CSS Course](https://www.youtube.com/watch?v=G3e-cpL7ofc) 
2. [React Course](https://www.youtube.com/watch?v=SqcY0GlETPk&t=163s)
3. [SSH Setup](https://www.youtube.com/watch?v=snCP3c7wXw0)
4. [Organizing React Projects](https://www.youtube.com/watch?v=UUga4-z7b6s)
5. [MERN Stack Explanation](https://www.youtube.com/watch?v=03Ie9ufPJno)
6. [MongoDB Crash Course](https://www.youtube.com/watch?v=ofme2o29ngU)
7. Lean JSON](https://www.youtube.com/watch?v=iiADhChRriM&t=183s)
8. REST API Tutorial](https://restfulapi.net/resource-naming/)
9. [RESTFUL API Explanation](https://www.youtube.com/watch?v=-MTSQjw5DrM)
10. [Arrow Functions Tutorial](https://www.youtube.com/watch?v=h33Srr5J9nY)
11. [Link Files](https://www.youtube.com/watch?v=emLHW0VhzeM)
12. [Learn Postman](https://www.youtube.com/watch?v=ypKHnRmPOUk)
13. Custom Fonts](https://www.youtube.com/watch?v=AAU25Fo4bFY)
14. [React Fonts](https://react-icons.github.io/react-icons/)
15. [Fix Boring UIs](https://www.youtube.com/watch?v=wcZ6jSlZqDc)
16. [Button Styling](https://ui-buttons.web.app/bubble-right)
17. [Split into sections](https://stackoverflow.com/questions/36236075/how-to-split-webpage-into-sections)
18. [Cookies vs Local Storage vs Session Storage - YT](https://www.youtube.com/watch?v=GihQAC1I39Q)
19. [Cookies vs Local Storage vs Session Storage - StackOverflow](https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies)
20. [JWT Debugger](https://www.jwt.io/)
21. [Debounce Text Input](https://stackoverflow.com/questions/42361485/how-long-should-you-debounce-text-input)
22. [Firebase Explanation](https://www.youtube.com/watch?v=vAoB4VbhRzM)
23. [JWT Token Refresh](https://www.reddit.com/r/node/comments/1pfep49/why_do_we_need_refresh_tokens_in_jwt/#:~:text=Most%20systems%20today%20use%20HTTPS,need%20refresh%20tokens%20in%20JWT)
24. [Sign Up Form](https://www.youtube.com/watch?v=8QgQKRcAUvM)
25. [Card Component] (https://www.youtube.com/watch?v=DyFhfBK9TgE)

---

## Technical Rationale ##

### Backend Structure ###
Backend first development. I built the entire backend before touching React. I thought of it like building a restaurant: first the kitchen (backend), then the menu (API routes), then the dining room (frontend). This let me test routes before adding frontend complexity.

Clear route organization. Looking at my index.js, I grouped routes by their function:
Auth routes (/api/auth/register, /api/auth/login)
Member routes (/api/members, /api/members/:id, /api/members/role/:role)
Post routes (/api/posts, /api/members/:id/posts)

Each route does one thing. GET routes retrieve data. POST routes create data. I also used the proper status codes: 200 for success, 201 for creation, 401 for unauthorized, 404 for not found.

Protected routes with middleware.  I built a requireAuth middleware that checks for a valid JWT before allowing post creation. This means anyone can read the feed, but only logged in users can post. The middleware extracts the token from the auth header, verifies it, and attaches the decoded user to req.user so routes know who's making the request.

Password security. I used bcrypt to hash passwords before storing them. When I return member data, I explicitly strip out the password field using destructuring (const { password, ...memberWithoutPassword } = members[id]). Passwords never leave the server.

Why no hardcoded JWT fallback. In my code, I intentionally don't have a fallback like JWT_SECRET || 'fallback-key'. If the .env file isn't configured, the server crashes immediately with a clear error. Instead, this forces proper setup and prevents accidentally running with an something that's insecure.

### Frontend Structure ###

Component per feature. I split the UI into logical pieces:
1. Sidebar.jsx — Contains navigation and user info
2. Feed.jsx — Contains main timeline
3. Post.jsx — Contains Individual post display
4. Peepbox.jsx — Contains Post composer
5. Explore.jsx — Contains Member directory
6. RightSidebar.jsx — Contains Search and suggestions
7. LoginSignup.jsx — Contains Authentication forms
8. AuthContext.jsx — Contains Global auth state

Each component handles one job. This help make debugging easier as when something broke I knew to look into a certain file instead of looking through a 300 line file.

AuthContext for global state. Instead of passing user and token through every component, I built a React Context that wraps the entire app. Any component can call useAuth() to check if the user is logged in, get their info, or trigger logout. This pattern is cleaner than prop drilling.

Conditional rendering based on auth. In App.jsx, I check isAuthenticated before rendering the main app. If you're not logged in, you see LoginSignup. If you are, you see the feed. This happens at the top level so I don't have to check auth in every component.

Session storage over localStorage. After researching on stack overflow, I chose session storage for the JWT token. Session storage clears when the browser tab closes, which is more secure than localStorage (which persists forever). For a social app where you might log in on a shared computer, this felt to me like the right tradeoff.

### Biggest Technical Tradeoffs ###

1. JSON file storage as opposed to MongoDB. JSON is simple and works for a demo with less than 100 members. But it has some cons: if two users post at the exact same millisecond, Date.now() gives them identical IDs, every write rewrites the entire file (fs.writeFileSync) and there is no query optimization (I'm loading everything into memory). 

I chose JSON because I wanted to focus on learning API fundamentals without database configuration overhead. The code is structured so migrating to MongoDB only requires changing how I read/write data in index.js (my routes and frontend stay the same).

2. JWT with 24 hour expiration. I set tokens to expire after 24 hours. Industry standard is often 5 15 minutes with refresh tokens. I chose longer expiration because: simpler implementation (no refresh token logic), better UX for the people reviewing my code (won't get logged out mid testing) and acceptable security for a non production app. In production, I'd add refresh tokens.

3. No debouncing on likes. In Post.jsx, I left a comment: "could add debouncing here to prevent spam click." I ran out of time. Right now, if someone clicks the heart 10 times fast, it sends 10 API requests. Debouncing would wait until they stop clicking, then send one request. I'd add this if I had more time.

4. Optimistic UI updates. When you like a post, I immediately update the heart icon and count (setLiked(!liked)) before the API request finishes. This makes the app feel instant. The tradeoff is that if the request fails, the UI is wrong. I log the error but don't revert the UI (a production app would handle this better).

### Most Difficult Technical Bug ###
The hardest bug wasn't a single error it was getting authentication to work end to end.

The problem was I could register users and generate tokens, but protected routes kept returning "Unauthorized" even with a valid token. I spent a lot of hours checking my middleware, my token generation, my headers.

I tried the following: console logging everything (the token was being generated correctly), checking the Authorization header (it was being sent), and verifying the token manually on jwt.io (it was valid). 

The actual issue ended up being I was storing the token in the frontend but not sending it correctly. My fetch request had headers: { 'Authorization': token } instead of headers: { 'Authorization': \Bearer ${token} }. The backend middleware expected Bearer <token> format and was splitting on space to extract the token. Without Bearer, it was trying to verify the literal string Bearer as a token.

I learnt from this that auth needs to have token generation, storage, transmission, and verification all matching. When something breaks, I now check each step individually. 

---

### AI Usage ###

I tried to heavily limit the use of AI because I was learning fundamentals. I wanted to understand, not simply copy.

When stack overflow didn't have an answer I would describe my situation and ask for explanations.

For instance: "i'm building auth for a React app. I need to store the jwt token on the client. What are the tradeoffs between session storage local storage and cookies? Which one is more secure and why?

After the AI's explanation I chose session storage.

This approach ended up taking longer than copy pasting solutions, but I actually understood my code by the end.

---

## Improvements ##

Debouncing on likes. Right now, spam clicking the heart sends multiple API requests. I'd add a 300ms debounce so it waits until you stop clicking.

Error handling. Errors currently just log to console. I want to add user facing messages so people know when something breaks.

Loading states. The feed is blank while data fetches. A skeleton loader would make the wait feel shorter.

MongoDB migration. JSON works for this demo, but I'd move to MongoDB for persistence and scalability.

Refresh tokens. Current JWTs expire after 24 hours with no refresh mechanism. I'd add refresh tokens for better security.

Unlike functionality. Right now you can only add likes, not remove them. The UI toggles, but the backend only increments.

---

## Acknowledgments ##

Thanks to Henry, Keiran, Carson, and Alejandro for their help during DALI office hours. 



