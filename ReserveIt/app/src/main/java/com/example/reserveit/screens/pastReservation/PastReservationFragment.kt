package com.example.reserveit.screens.pastReservation

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.adapters.UpComingReservationAdapter
import com.example.reserveit.databinding.FragmentPastReservationBinding
import com.example.reserveit.databinding.FragmentResrevationBinding
import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.screens.resrevation.ResrevationViewModel

class PastReservationFragment : Fragment() {

    private var binding : FragmentPastReservationBinding?= null
    private lateinit var viewModel: PastReservationViewModel

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentPastReservationBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()
        viewModel = PastReservationViewModel(ReservationRepo(), requireContext())
        viewModel.getUPastReservations()

        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }

        val recyclerView = binding!!.reservationRecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(context)

        viewModel.bookedDataList.observe(viewLifecycleOwner, androidx.lifecycle.Observer {

            if(it.isEmpty()){
                binding!!.loaderLayout.visibility = View.VISIBLE
                binding!!.noReservationsTextView.visibility = View.VISIBLE
                binding!!.reservationRecyclerView.visibility = View.GONE
                binding!!.lottieNoDocAnimationView.visibility = View.VISIBLE
            }else {
                val adapter = UpComingReservationAdapter(it)
                recyclerView.adapter = adapter
                recyclerView.adapter?.notifyDataSetChanged()
                binding!!.noReservationsTextView.visibility = View.GONE
                binding!!.reservationRecyclerView.visibility = View.VISIBLE
                binding!!.lottieNoDocAnimationView.visibility = View.GONE
                binding!!.loaderLayout.visibility = View.GONE
            }
        })

        binding!!.refreshLayout.setOnRefreshListener {
            viewModel.getUPastReservations()
            binding!!.refreshLayout.isRefreshing = false
        }

        viewModel.isLoading.observe(viewLifecycleOwner, androidx.lifecycle.Observer {
//            if (it){
//                binding!!.loaderLayout.visibility = View.VISIBLE
//                binding!!.lottieSearchAnimationView.visibility = View.VISIBLE
//                binding!!.refreshLayout.visibility = View.GONE
//            }else{
//                binding!!.loaderLayout.visibility = View.GONE
//                binding!!.refreshLayout.visibility = View.VISIBLE
//            }
        })

        viewModel.isError.observe(viewLifecycleOwner, androidx.lifecycle.Observer {
//            if (it){
//                Snackbar.make(binding!!.reservationRelativeLayout, "Something went wrong while retrieving data", Snackbar.LENGTH_SHORT,)
//                    .show();
//                binding!!.loaderLayout.visibility = View.VISIBLE
//                binding!!.lottieErrorAnimationView.visibility = View.VISIBLE
//            }else{
//                binding!!.loaderLayout.visibility = View.GONE
//                binding!!.lottieErrorAnimationView.visibility = View.GONE
//            }
        })


        return binding?.root;
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }



}