# CST 336 - Internet Programming

- Professor: Dr. Miguel Lara
- TA: James Campbell

**Course Description:**

> Provides students with dynamic web application development skills, focusing on the integration of server-side programming, database connectivity, and client-side scripting. Coverage includes the Internet architecture, responsive design, RESTful web services, and Web APIs.
> <br>

---

---

## _Final Project: Album Collection_

Placeholder: link to website.

---

### **Table of Contents:**

> Placeholder. This is a test of Replit's version control.

---

---


### **Team:**

- [Larry Chiem](https://github.com/KFChinese)
- [Ian Rowe](https://github.com/MaskedCrash)
- [Raymond Shum](https://github.com/raymondshum)
- [Nicholas Stankovich](https://github.com/NStankovich)

--- 

### **Project Description:**

> This website allows a user to build and manage their album collection using the Discogs API.

---

### **Resources:**

- [Discogs API Documentation](https://www.discogs.com/developers)
- Suggested API Calls: 
    - [GET] /database/search?q={query}&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}
    - [GET] /releases/{release_id}{?curr_abbr}
    - [GET] /artists/{artist_id}
    - [GET] /labels/{label_id}
    - [GET] /marketplace/price_suggestions/{release_id}

---

### **User Flow:**

> User must be authorized first before proceeding to the dashboard and beyond. The
user can only access to the "Home", "Sign Up" and "Log In" pages before then.

![userflow](/documentation/userflow.JPG)

---

### **DB Schema:**

> We are querying the Discog's API for all album data: title, thumbnail, etc. Our DB
only associates Discog's album IDs with our users.

![schema](/documentation/schema.JPG)

---

### **Screenshots:**

> Placeholder Description

---

### **Rubric:**

![rubric](/documentation/rubric.JPG)
