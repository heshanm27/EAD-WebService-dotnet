package com.example.reserveit.util // Corrected package name

import android.content.Context
import android.content.SharedPreferences

object SharedPreferenceService {

    private lateinit var sharedPreferences: SharedPreferences // Initialize later

    // Initialize the sharedPreferences in your Application class
    fun initialize(context: Context) {
        sharedPreferences = context.getSharedPreferences("my_shared_preferences", Context.MODE_PRIVATE)
    }

    fun getAll(): Map<String, *> {
        return sharedPreferences.all
    }

    fun contains(key: String): Boolean {
        return sharedPreferences.contains(key)
    }

    fun getBoolean(key: String, defaultValue: Boolean): Boolean {
        return sharedPreferences.getBoolean(key, defaultValue)
    }

    fun getFloat(key: String, defaultValue: Float): Float {
        return sharedPreferences.getFloat(key, defaultValue)
    }

    fun getInt(key: String, defaultValue: Int): Int {
        return sharedPreferences.getInt(key, defaultValue)
    }

    fun getLong(key: String, defaultValue: Long): Long {
        return sharedPreferences.getLong(key, defaultValue)
    }

    fun getString(key: String, defaultValue: String?): String? {
        return sharedPreferences.getString(key, defaultValue)
    }

    fun getStringSet(key: String, defaultValue: MutableSet<String>?): MutableSet<String>? {
        return sharedPreferences.getStringSet(key, defaultValue)
    }

    fun edit(): SharedPreferences.Editor {
        return sharedPreferences.edit()
    }
    fun cleatvalue(){
        sharedPreferences.edit().clear().apply()
    }
    fun saveValue(key: String, value: Any) {
        val editor = sharedPreferences.edit()
        when (value) {
            is Boolean -> editor.putBoolean(key, value)
            is Float -> editor.putFloat(key, value)
            is Int -> editor.putInt(key, value)
            is Long -> editor.putLong(key, value)
            is String -> editor.putString(key, value)
            is Set<*> -> editor.putStringSet(key, value as MutableSet<String>)
        }
        editor.apply()
    }

    fun getValue(key: String, defaultValue: Any): Any? {
        return when (defaultValue) {
            is Boolean -> sharedPreferences.getBoolean(key, defaultValue)
            is Float -> sharedPreferences.getFloat(key, defaultValue)
            is Int -> sharedPreferences.getInt(key, defaultValue)
            is Long -> sharedPreferences.getLong(key, defaultValue)
            is String -> sharedPreferences.getString(key, defaultValue as? String)
            is Set<*> -> sharedPreferences.getStringSet(key, defaultValue as? MutableSet<String>)
            else -> null
        }
    }
}