package com.example.reserveit.models.login

import com.beust.klaxon.*

private val klaxon = Klaxon()

data class LoginModel (
    val data: Data,
    val status: Boolean,
    val message: String
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<LoginModel>(json)
    }
}

data class Data (
    val token: String,
    val firstName: String,
    val lastName: String,

    @Json(name = "avatarUrl")
    val avatarURL: String,

    val role: String
)
