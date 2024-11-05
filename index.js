import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs", { posts: posts});
});

// Render Compose Form
app.get('/compose', (req, res) => {
    res.render("compose.ejs");
});

// Handle Form Submission
app.post("/compose", (req, res) => {
    const newPost = {
        id: Date.now().toString(), // Unique ID for each post
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost); // Add post to the in-memory array
    res.redirect("/"); // Redirect back to the homepage
});


// Display Individual Post
app.get('/posts/:id', (req, res) => {
    const requestedId = req.params.id;
    const post = posts.find(post => post.id === requestedId);
    
    if (post) {
        res.render('post', { title: post.title, content: post.content });
    } else {
        res.status(404).send('Post not found'); // Handle post not found
    }
});


app.listen(port ,() =>{
    console.log(`Listening on ${port}`);
});