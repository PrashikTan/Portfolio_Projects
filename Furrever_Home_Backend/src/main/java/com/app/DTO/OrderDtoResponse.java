package com.app.DTO;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.app.Entity.Order;

public class OrderDtoResponse {

	
	
	
	    private Long orderId;
	    private LocalDate orderDate;
	    private List<OrderItemResponse> orderItems;

	    public OrderDtoResponse(Order order) {
	        this.orderId = order.getOrderId();
	        this.orderDate = order.getOrderDate();
	        this.orderItems = order.getOrderDetails().stream()
	                                .map(OrderItemResponse::new)
	                                .collect(Collectors.toList());
	    }

	    // Getters and Setters
	    public Long getOrderId() {
	        return orderId;
	    }

	    public void setOrderId(Long orderId) {
	        this.orderId = orderId;
	    }

	    public LocalDate getOrderDate() {
	        return orderDate;
	    }

	    public void setOrderDate(LocalDate orderDate) {
	        this.orderDate = orderDate;
	    }

	    public List<OrderItemResponse> getOrderItems() {
	        return orderItems;
	    }

	    public void setOrderItems(List<OrderItemResponse> orderItems) {
	        this.orderItems = orderItems;
	    }
	}

