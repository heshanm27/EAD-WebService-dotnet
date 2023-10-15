package com.example.reserveit.dto.auth

data class SignUpRequestBody(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val confirmPassword: String,
    val nic: String
)
