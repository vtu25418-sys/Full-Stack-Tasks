SELECT 
    c.name,
    p.product_name,
    o.quantity,
    (o.quantity * p.price) AS total_amount,
    o.order_date
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Products p ON o.product_id = p.product_id
ORDER BY o.order_date DESC;