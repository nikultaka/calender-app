<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;

class CalendarController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function index()
    {
        $data = Event::select('*')->get();
        $events  = array();
        foreach ($data as $event) {
            $events[] = [
                'id' => $event->id,
                'title' => $event->DAY_TYPE,
                'start' => $event->STARTTIME,
                'end' => $event->ENDTIME,
                'staff' => $event->STR_STAFF_NBR,

            ];
        }

        return view('calendar')->with(compact('events'));
    }

    function addEvent(Request $request)
    {
   

        $result = array();
        $result['status'] = 0;
        $result['msg'] = "Oops ! Event Not Inserted";

        $data = $request->all();
        $id = isset($data['id']) &&  $data['id'] !== '' ? $data['id'] : '';


        if (!$id) {



            $data_insert = new Event();
            $data_insert->DAY_TYPE = $data['dayType'];
            $data_insert->STR_STAFF_NBR = $data['staffNumber'];
            $data_insert->DATE =  Carbon::now();
            $data_insert->STARTTIME = $data['startDate'];
            $data_insert->ENDTIME = $data['endDate'];
            $data_insert->TXT_DAY_DESCRIPTION = $data['description'];

            $data_insert->save();
            $insert_id = $data_insert->id;
            if ($insert_id) {
                $result['status'] = 1;
                $result['msg'] = "Event inserted Successfully";
                $result['id'] = $insert_id;
            }

        } else {
         

            $updateDetails = Event::where('id', $id)->first();
            $updateDetails->STARTTIME = $data['startDate'];
            $updateDetails->ENDTIME = $data['endDate'];

            $updateDetails->save();
            $result['status'] = 1;
            $result['msg'] = "Event Update Successfully!";
        }



        echo json_encode($result);
        exit();
    }
}
