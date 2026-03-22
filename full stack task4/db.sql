CREATE DATABASE orderdb;
USE orderdb;

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

INSERT INTO Customers (name, email, city) VALUES
('Midhilesh', 'midh@gmail.com', 'Hyderabad'),
('Charan', 'charan@gmail.com', 'Chennai'),
('Manohar', 'manu@gmail.com', 'Bangalore');

INSERT INTO Products (product_name, price) VALUES
('Laptop', 60000),
('Mobile', 25000),
('Headphones', 3000);

INSERT INTO Orders (customer_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2026-02-01'),
(1, 3, 2, '2026-02-10'),
(2, 2, 1, '2026-02-12'),
(3, 1, 1, '2026-02-14');