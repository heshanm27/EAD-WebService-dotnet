package com.example.reserveit.screens.login

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.widget.doOnTextChanged
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentLoginBinding
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.repo.AuthRepo

/*
* File: BookedDetailsFragment.kt
* Author:
* Description: This class is used to display Login screen.
* */


class LoginFragment : Fragment() {
    private var binding: FragmentLoginBinding ?= null
    private lateinit var loginViewModel: LoginViewModel

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentLoginBinding.inflate(inflater, container, false)

        val authRepo = AuthRepo()
        loginViewModel = LoginViewModel(authRepo, requireContext())
        (activity as MainActivity?)!!.hideBottomNavigationView()

        //navigation back icon on click
        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }

        binding!!.topAppBar.setOnMenuItemClickListener() { menuItem ->
            when (menuItem.itemId) {
                R.id.sign_up -> {
                    findNavController().navigate(R.id.action_loginFragment_to_signUpFragment)
                    true
                }
                else -> false
            }
        }
        
        binding!!.emailEditText.doOnTextChanged { text, start, before, count ->

            if (text!!.isNotEmpty()) {
                binding!!.emailLayout.error = null

                val emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+"
                val isValidEmail = text.matches(emailPattern.toRegex())

                if (isValidEmail) {
                    // Text is a valid email address
                    // Your further logic here
                } else {
                    binding!!.emailLayout.error = "Invalid email address"
                }
            } else {
                binding!!.emailLayout.error = "Email is required"
            }
        }

        binding!!.passwordEditText.doOnTextChanged { text, start, before, count ->
            if (text!!.isNotEmpty()) {

                if(text.length < 6){
                    binding!!.password.error = "Password must be at least 6 characters"
                }else{
                    binding!!.password.error = null
                }
            } else {
                binding!!.password.error = "Password is required"
            }
        }

        binding!!.topAppBar.setOnMenuItemClickListener { menuItem ->
            when (menuItem.itemId) {
                R.id.sign_up -> {
                    findNavController().navigate(R.id.action_loginFragment_to_signUpFragment)
                    true
                }
                else -> false
            }
        }
        binding!!.loginBtn.setOnClickListener {
            var  loginData = LoginRequestBody(binding!!.emailEditText.text.toString(), binding!!.passwordEditText.text.toString())

            binding!!.errorText.visibility = View.GONE
            binding!!.errorText.error = ""
            if (binding!!.emailEditText.text.toString().isEmpty() ) {
                binding!!.emailLayout.error = "Email is required"
                return@setOnClickListener
            }
            if (binding!!.passwordEditText.text.toString().isEmpty()) {
                binding!!.password.error = "Password is required"
                return@setOnClickListener
            }
            loginViewModel.login(loginData)
        }

        loginViewModel.isLoading.observe(viewLifecycleOwner, Observer { isLoading ->
            if (isLoading) {
                binding!!.loginBtn.isEnabled = false
                binding!!.loginBtn.text = ""
                binding!!.btnCircleProgress.visibility = View.VISIBLE
            } else {
                binding!!.loginBtn.isEnabled = true
                binding!!.loginBtn.text = "Login"
                binding!!.btnCircleProgress.visibility = View.GONE
            }
        })

        loginViewModel.loginResponse.observe(viewLifecycleOwner, Observer { loginResponse ->
            if (loginResponse != null) {
                Log.d("ggview", loginResponse.status.toString())
                if(loginResponse.status === true){
                    findNavController().popBackStack()
                    findNavController().navigate(R.id.action_loginFragment_to_profileFragment)
                }else{
                    binding!!.errorText.visibility = View.VISIBLE
                    binding!!.errorText.error = loginResponse.message
                }
            }
        })
        return binding!!.root
    }



    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }

}