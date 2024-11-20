"use client"
import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import Link from 'next/link';


export default function Page() {
    const calendarRef = useRef(null);
  const overlayPanelRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState([
    { title: 'Event 1', date: '2024-06-01', description: 'Description for Event 1' },
    { title: 'Event 2', date: '2024-06-02', description: 'Description for Event 2' }
  ]);
  const [activeView, setActiveView] = useState('dayGridMonth'); // Track active view (Month, Week, Day)
  const [selectedEvent, setSelectedEvent] = useState(null);

  const months = [
    { name: 'January', code: 0 },
    { name: 'February', code: 1 },
    { name: 'March', code: 2 },
    { name: 'April', code: 3 },
    { name: 'May', code: 4 },
    { name: 'June', code: 5 },
    { name: 'July', code: 6 },
    { name: 'August', code: 7 },
    { name: 'September', code: 8 },
    { name: 'October', code: 9 },
    { name: 'November', code: 10 },
    { name: 'December', code: 11 }
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { name: year.toString(), code: year };
  });

  const handleMonthChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(e.value.code);
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(e.value.code);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setActiveView(view); // Update active view
    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setCurrentDate(calendarApi.getDate());
      setActiveView(calendarApi.view.type); // Update active view
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    overlayPanelRef.current.toggle(info.jsEvent);
  };

  const renderEventContent = (eventInfo) => (
    <div className="bg-[#F9FBFD] border border-[#E8EEF7] py-1.5 3xl:py-[0.313vw] px-2.5 3xl:px-[0.521vw] cursor-pointer flex items-center gap-2 3xl:gap-[0.417vw]">
        <div className='text-[#3166B7] text-base w-[30px] h-[30px] flex items-center justify-center bg-[#E8EEF7] rounded-md 3xl:rounded-[0.313vw]'><i className='hexatoolassignment-doc'></i></div>
        <dvi>
            <div className='text-[#1B55AF] text-xs 3xl:text-[0.625vw] font-semibold leading-[18px] 3xl:leading-[0.938vw]'>Assignment Due</div>
            <div className='text-[#3166B7] text-xs 3xl:text-[0.625vw] font-semibold leading-[18px] 3xl:leading-[0.938vw]'>Domino Addition</div>
        </dvi>
      {/* <strong>{eventInfo.timeText}</strong>
      <span>{eventInfo.event.title}</span> */}
    </div>
  );

  const [selectedCity, setSelectedCity] = useState(null);
    const Grade = [
        { name: 'All', code: 'NY' },
        { name: '2nd Grade Science', code: 'RM' },
        { name: '2nd Grade Art', code: 'LDN' },
        { name: '2nd Grade Math', code: 'IST' },
        { name: '2nd Grade Reading', code: 'PRS' },
        { name: 'School', code: 'PRS' }
    ];
    const Assignments = [
        { name: 'All', code: 'NY' },
        { name: 'Assignments', code: 'RM' },
        { name: 'Online Class', code: 'LDN' },
        { name: 'Parent/Instructor Meeting', code: 'IST' },
    ];

    return (
      <>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='text-[#101828] text-[28px] font-semibold leading-[38px] 3xl:text-[1.563vw]'>My Calendar</div>
                    <div className='flex items-center gap-[14px] 3xl:gap-[0.781vw]'>
                        <div>
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={Grade} optionLabel="name" 
                placeholder="2nd Grade Math" className="w-full md:w-14rem h-[44px] 3xl:h-[2.292vw] text-[#101828] text-sm 3xl:text-[0.833vw] font-normal placeholder:text-[#101828] placeholder:text-sm placeholder:3xl:text-[0.833vw] placeholder:font-normal custm_dropwon" />
                        </div>
                        <div>
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={Grade} optionLabel="name" 
                placeholder="2nd Grade Science" className="w-full md:w-14rem h-[44px] 3xl:h-[2.292vw] text-[#101828] text-sm 3xl:text-[0.833vw] font-normal placeholder:text-[#101828] placeholder:text-sm placeholder:3xl:text-[0.833vw] placeholder:font-normal custm_dropwon" />
                        </div>
                        <div><Link href={''} className='text-white text-base 3xl:text-[0.833vw] font-medium leading-6 3xl:leading-[1.25vw] bg-[#FF7F01] border border-[#FF7F01] rounded-lg h-[44px] 3xl:h-[2.292vw] px-4 3xl:px-[0.938vw] flex items-center justify-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolplus'></i><span>Create New Event</span></Link></div>
                    </div>
                </div>

        {/*FullCalendar*/}
        <div className='bg-white border border-[#C8CBD0] rounded-lg px-7 3xl:px-[1.667vw] py-[18px] 3xl:py-[1.042vw] mt-8 3xl:mt-[1.927vw]'>
        <div className="flex items-center justify-between">
        {/*Left Side*/}
        <div className='flex items-center gap-4 3xl:gap-[0.833vw]'>
        <div className="flex items-center bg-[#FFF2E5] border border-[#FFD8B2] rounded-md p-1">
            <div className={activeView === 'dayGridMonth' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#E57200] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#E57200] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => handleViewChange('dayGridMonth')}>Month</div>
            <div className={activeView === 'timeGridWeek' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#E57200] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#E57200] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => handleViewChange('timeGridWeek')}>Week</div>
            <div className={activeView === 'timeGridDay' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#E57200] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#E57200] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => handleViewChange('timeGridDay')}>Day</div>
        </div>
        <div className="text-[#101828] text-base 3xl:text-[0.938vw] font-semibold leading-7 3xl:leading-[1.458vw]">
            <h2>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        </div>
        </div>
        {/*Left Side*/}
        {/*Right Side*/}
        <div className='flex items-center gap-3.5 3xl:gap-[0.781vw]'>
        <div className="flex items-center gap-3.5 3xl:gap-[0.781vw]">
            <Dropdown
            value={months.find((month) => month.code === currentDate.getMonth())}
            options={months}
            onChange={handleMonthChange}
            optionLabel="name"
            placeholder="Select a Month"
            className="w-full md:w-[180px] md:h-[44px] 3xl:h-[2.292vw] custm_dropwon"
            />
            <Dropdown
            value={years.find((year) => year.code === currentDate.getFullYear())}
            options={years}
            onChange={handleYearChange}
            optionLabel="name"
            placeholder="Select a Year"
            className="w-full md:w-[180px] md:h-[44px] 3xl:h-[2.292vw] custm_dropwon"
            />
        </div>
        <div className="flex items-center gap-3.5 3xl:gap-[0.781vw]">
            <div onClick={handlePrev} className='bg-white border border-[#C8CBD0] rounded-md w-[44px] 3xl:w-[2.292vw] h-[44px] 3xl:h-[2.292vw] flex items-center justify-center text-[#98A2B3] text-xl 3xl:text-[1.25vw] cursor-pointer'><i className='hexatoolleft-arrow'></i></div>
            <div onClick={handleNext} className='bg-white border border-[#C8CBD0] rounded-md w-[44px] 3xl:w-[2.292vw] h-[44px] 3xl:h-[2.292vw] flex items-center justify-center text-[#98A2B3] text-xl 3xl:text-[1.25vw] cursor-pointer'><i className='hexatoolright-arrow'></i></div>
            {/* <button onClick={handleToday}>Today</button> */}
        </div>
        </div>
        {/*Right Side*/}

        </div>
        <div className='mt-[18px] 3xl:mt-[0.938vw] Calendar_Ui'>
        <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={false} // Disable default header
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        />
        </div>
        </div>
        {/*FullCalendar*/}
            </div>


        <OverlayPanel ref={overlayPanelRef} className='calender_OverlayPanel' style={{width:'600px'}}>
        <div className='bg-white shadow-lg rounded-lg p-5 3xl:p-[1.042vw] space-y-[18px] 3xl:space-y-[1.042vw]'>
        <div className='flex items-center gap-2.5 3xl:gap-[0.521vw]'>
            <div className='text-[#000000] text-lg 3xl:text-[1.042vw] font-medium leading-7 3xl:leading-[1.563vw]'>Domino Addition</div>
            <div className='bg-[#98A2B3] rounded p-1.5 3xl:p-[0.313vw] text-white text-xs 3xl:text-[0.625vw] font-normal leading-[18px] 3xl:leading-[0.938vw]'>20 Points</div>
        </div>
        {/*col*/}
        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col p-2.5 3xl:p-[0.521vw] gap-2.5 3xl:gap-[0.521vw] bg-[#FFFCF8] border border-[#FFF2E5] rounded-lg'>
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#344054] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <i className='hexatoolthumb-circule-fill'></i>
                        <span>Assigned To</span>
                    </div>
                    <div className='bg-[#344054] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>25</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#039855] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <i className='hexatoolright-tick-ouline'></i>
                        <span>Submitted</span>
                    </div>
                    <div className='bg-[#039855] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>20</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#D92D20] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <i className='hexatoolclose-circule'></i>
                        <span>Not Submitted</span>
                    </div>
                    <div className='bg-[#D92D20] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>5</div>
                </div>
                {/*col*/}
            </div>
            {/*col*/}
            <div className='flex flex-col p-2.5 3xl:p-[0.521vw] gap-2.5 3xl:gap-[0.521vw] bg-[#FFFCF8] border border-[#FFF2E5] rounded-lg'>
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#344054] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <span>Submitted Status</span>
                    </div>
                    <div className='bg-[#344054] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white invisible'>25</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#039855] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <i className='hexatoolright-tick-ouline'></i>
                        <span>Approved</span>
                    </div>
                    <div className='bg-[#039855] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>15</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#DC6803] flex items-center gap-1 3xl:gap-[0.26vw]'>
                        <i className='hexatoolclose-circule'></i>
                        <span>Waiting Approval</span>
                    </div>
                    <div className='bg-[#DC6803] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>5</div>
                </div>
                {/*col*/}
            </div>
        </div>
        {/*col*/}
        <div className='3xl:pt-[] pt-5 border-t border-[#E4E7EC]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 3xl:gap-[1.042vw]'>
                    <div className='text-[#344054] text-sm font-normal leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw]'><p>Group: <span className='text-[#667085]'>Numbers</span></p></div>
                    <div className='text-[#344054] text-sm font-normal leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw]'><p>Folder: <span className='text-[#667085]'>Activities</span></p></div>
                </div>
                <div><Link href={''} className='text-[#1B55AF] text-sm 3xl:text-[0.833vw] font-medium leading-5 3xl:leading-[1.25vw] border border-[#1B55AF] py-2.5 3xl:py-[0.521vw] px-4 3xl:px-[0.938vw] rounded-lg 3xl:rounded-[0.417vw]'>View Details</Link></div>
            </div>
        </div>
        </div>
        </OverlayPanel>
        </>
    )
}
