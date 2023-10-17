package com.example.reserveit.screens.resrevation

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity

import com.example.reserveit.adapters.UpComingReservationAdapter
import com.example.reserveit.databinding.FragmentResrevationBinding
import com.example.reserveit.models.login.LoginModel


import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.android.material.snackbar.Snackbar

/*
* File: ReservationFragment.kt
* Author:
* Description: This class is used to display all reservations.
* */

class ResrevationFragment : Fragment() {

    private var binding : FragmentResrevationBinding?= null

    private lateinit var viewModel: ResrevationViewModel

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.showBottomNavigationView()
        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)
        if(sharedPreferences != null && sharedPreferences is LoginModel){
            if(sharedPreferences.data != null){
                viewModel.getUpcomingReservations()
            }
        }
    }

    override fun onStart() {
        super.onStart()
        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)
        if(sharedPreferences != null && sharedPreferences is LoginModel){
            if(sharedPreferences.data != null){
                viewModel.getUpcomingReservations()
            }
        }
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentResrevationBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.showBottomNavigationView()
        viewModel = ResrevationViewModel(ReservationRepo(), requireContext())
        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)
        if(sharedPreferences != null && sharedPreferences is LoginModel){
            if(sharedPreferences.data != null){
                viewModel.getUpcomingReservations()
            }
        }
        findNavController().addOnDestinationChangedListener() { controller, destination, arguments ->
            if(sharedPreferences != null && sharedPreferences is LoginModel){
                if(sharedPreferences.data != null){
                    viewModel.getUpcomingReservations()
                }
            }
        }

        val recyclerView = binding!!.reservationRecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(context)

        viewModel.bookedDataList.observe(viewLifecycleOwner, androidx.lifecycle.Observer {

            if(it.isEmpty()){
                binding!!.loaderLayout.visibility = View.VISIBLE
                binding!!.noReservationsTextView.visibility = View.VISIBLE
                binding!!.lottieSearchAnimationView.visibility = View.GONE
                binding!!.reservationRecyclerView.visibility = View.GONE
                binding!!.lottieNoDocAnimationView.visibility = View.VISIBLE
            }else {
                val adapter = UpComingReservationAdapter(it)
                recyclerView.adapter = adapter
                recyclerView.adapter?.notifyDataSetChanged()
                binding!!.reservationRecyclerView.visibility = View.VISIBLE
                if(binding!!.loaderLayout.visibility == View.VISIBLE){
                    binding!!.loaderLayout.visibility = View.GONE
                }
            }
        })

        binding!!.refreshLayout.setOnRefreshListener {
            viewModel.getUpcomingReservations()
            binding!!.refreshLayout.isRefreshing = false
        }

        viewModel.isLoading.observe(viewLifecycleOwner, androidx.lifecycle.Observer {
            if (it){
                binding!!.loaderLayout.visibility = View.VISIBLE
                binding!!.lottieSearchAnimationView.visibility = View.VISIBLE
                binding!!.lottieNoDocAnimationView.visibility = View.GONE
                binding!!.refreshLayout.visibility = View.GONE
            }else{
                if(viewModel.bookedDataList.value!!.isNotEmpty()){
                    binding!!.loaderLayout.visibility = View.GONE
                    binding!!.loaderLayout.visibility = View.GONE
                    binding!!.refreshLayout.visibility = View.VISIBLE
                }

            }
        })

        viewModel.isError.observe(viewLifecycleOwner, androidx.lifecycle.Observer {
            if (it){
                Snackbar.make(binding!!.reservationRelativeLayout, "Something went wrong while retrieving data", Snackbar.LENGTH_SHORT,)
                    .show();
//                binding!!.loaderLayout.visibility = View.VISIBLE
//                binding!!.lottieErrorAnimationView.visibility = View.VISIBLE
            }else{
//                binding!!.loaderLayout.visibility = View.GONE
//                binding!!.lottieErrorAnimationView.visibility = View.GONE
            }
        })


        return binding?.root;
    }



}