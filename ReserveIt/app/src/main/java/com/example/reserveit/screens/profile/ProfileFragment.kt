package com.example.reserveit.screens.profile

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentLoginBinding
import com.example.reserveit.databinding.FragmentProfileBinding

/*
* File: ProfileFragment.kt
* Author:
* Description: This class is used to display user profile.
* */

class ProfileFragment : Fragment() {

    private var binding: FragmentProfileBinding ?= null
    private lateinit var viewModel: ProfileViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater, container, false)

        binding!!.signInButton.setOnClickListener {
                findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }

        return binding!!.root
    }



}