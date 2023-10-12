//package com.example.reserveit.utill
//
//import android.app.Application
//import android.content.Context
//import android.content.SharedPreferences
//
//object SharedPreferenceService {
//
//    private val sharedPreferences: SharedPreferences = getSharedPreferences()
//
//    private fun getSharedPreferences(): SharedPreferences {
//        return Application.getContext().getSharedPreferences("my_shared_preferences", Context.MODE_PRIVATE)
//    }
//
//    fun getAll(): Map<String, *> {
//        return sharedPreferences.all
//    }
//
//    fun contains(key: String): Boolean {
//        return sharedPreferences.contains(key)
//    }
//
//    fun getBoolean(key: String, defaultValue: Boolean): Boolean {
//        return sharedPreferences.getBoolean(key, defaultValue)
//    }
//
//    fun getFloat(key: String, defaultValue: Float): Float {
//        return sharedPreferences.getFloat(key, defaultValue)
//    }
//
//    fun getInt(key: String, defaultValue: Int): Int {
//        return sharedPreferences.getInt(key, defaultValue)
//    }
//
//    fun getLong(key: String, defaultValue: Long): Long {
//        return sharedPreferences.getLong(key, defaultValue)
//    }
//
//    fun getString(key: String, defaultValue: String?): String? {
//        return sharedPreferences.getString(key, defaultValue)
//    }
//
//    fun getStringSet(key: String, defaultValue: MutableSet<String>?): MutableSet<String>? {
//        return sharedPreferences.getStringSet(key, defaultValue)
//    }
//
//    fun edit(): Editor {
//        return sharedPreferences.edit()
//    }
//
//    fun saveValue(key: String, value: Any) {
//        val editor = sharedPreferences.edit()
//        when (value) {
//            is Boolean -> editor.putBoolean(key, value)
//            is Float -> editor.putFloat(key, value)
//            is Int -> editor.putInt(key, value)
//            is Long -> editor.putLong(key, value)
//            is String -> editor.putString(key, value)
//            is Set<*> -> editor.putStringSet(key, value as MutableSet<String>)
//        }
//        editor.apply()
//    }
//
//    fun getValue(key: String, defaultValue: Any): Any? {
//        return when (defaultValue) {
//            is Boolean -> sharedPreferences.getBoolean(key, defaultValue as Boolean)
//            is Float -> sharedPreferences.getFloat(key, defaultValue as Float)
//            is Int -> sharedPreferences.getInt(key, defaultValue as Int)
//            is Long -> sharedPreferences.getLong(key, defaultValue as Long)
//            is String -> sharedPreferences.getString(key, defaultValue as String?)
//            is Set<*> -> sharedPreferences.getStringSet(key, defaultValue as MutableSet<String>?)
//            else -> null
//        }
//    }
//}