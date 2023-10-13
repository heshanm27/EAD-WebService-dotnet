package com.example.reserveit.screens.login

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentLoginBinding
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.repo.AuthRepo




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
        loginViewModel = LoginViewModel(authRepo)
        (activity as MainActivity?)!!.hideBottomNavigationView()

        //navigation back icon on click
        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
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
            var  loin = LoginRequestBody(binding!!.emailEditText.text.toString(), binding!!.passwordEditText.text.toString())
            Log.d("LOGD", binding!!.emailEditText.text.toString())
            Log.d("LOGD", binding!!.passwordEditText.text.toString())

            loginViewModel.login(loin)
        }


        return binding!!.root
    }



    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }

}