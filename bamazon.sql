
USE `heroku_169bfb334eb585d`;
CREATE TABLE `products` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `products_name` varchar(30) NOT NULL,
    `department_id` int(11) NOT NULL,
    `price` decimal (10,2) NOT NULL,
    `stock_quantity` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `department_id` (`department_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

INSERT INTO `products` VALUES(1,'Tissue',1,19.99,10),(2,'Papertowels',1,29.99,9),(3,'gloves',2,15.75,15),(4,'masks',2,39.99,2),(5,'disinfectantwipes',3,22.99,30),(6,'disinfectantspray',3,28.99,25),(7,'trashbags',4,11.99,38),(8,'scrubpads',5,7.99,50),(9,'lotion',6,9.50,45),(10,'handsanitizer',6,5.60,39);

SELECT * From products;