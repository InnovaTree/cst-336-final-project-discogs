USE finalproject;

CREATE TABLE user (
	userid INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(100),
    lname VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    PRIMARY KEY (userid)
);

CREATE TABLE collection (
	collectionid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    albumid INT NOT NULL,
    PRIMARY KEY (collectionid),
    FOREIGN KEY (userid) REFERENCES user (userid)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE wishlist (
	wishlistid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    albumid INT NOT NULL,
    PRIMARY KEY (wishlistid),
    FOREIGN KEY (userid) REFERENCES user (userid)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE review (
	reviewid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    albumid INT NOT NULL,
    reviewtext TEXT NOT NULL,
    PRIMARY KEY (reviewid),
	FOREIGN KEY (userid) REFERENCES user (userid)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);