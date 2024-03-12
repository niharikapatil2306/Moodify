import { useEffect, useState } from "react";
import { Button, FormSelect } from "react-bootstrap";
import moment from 'moment';
import axios from 'axios';

function getMonthDatesString(month, year) {

    const startDate = moment().month(month).year(year).date(1);

    const endDate = moment().month(month).year(year).endOf('month');

    let datesString = [];
    for (let date = startDate.clone(); date <= endDate; date.add(1, 'days')) {
        datesString.push(date.format('DD'))
    }

    return datesString;
}

export default function MoodifyPage() {

    const moods = ['happy', 'sad', 'angry']

    const [mood, setMood] = useState("");

    const [month, setMonth] = useState(moment().get('month'));
    const months = [
        { number: 0, name: "January" },
        { number: 1, name: "February" },
        { number: 2, name: "March" },
        { number: 3, name: "April" },
        { number: 4, name: "May" },
        { number: 5, name: "June" },
        { number: 6, name: "July" },
        { number: 7, name: "August" },
        { number: 8, name: "September" },
        { number: 9, name: "October" },
        { number: 10, name: "November" },
        { number: 11, name: "December" },
    ];

    const [year, setYear] = useState(moment().get('year'));

    moment().locale('en');

    const [dates, setDates] = useState([]);

    const [day, setDay] = useState(moment().get('date'));

    const [currentPage, setCurrentPage] = useState(0);

    const today = moment();
    const initialPage = Math.floor((today.date() - 1) / 4);

    const postData = () => {
        axios.post('http://127.0.0.1:8000/mood', {
            mood: mood,
            day: year.toString() + '-' + (month + 1).toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0')
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        setDates(getMonthDatesString(month, year));
        setCurrentPage(initialPage);
        if(mood!=""){
            postData();
        }
    }, [month, year, mood]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(dates.length / 4) - 1) { // Check for valid pages
            setCurrentPage(currentPage + 1);
        }
    };

    const getVisibleDates = () => {
        const startIndex = currentPage * 4;
        const endIndex = Math.min(startIndex + 4, dates.length);
        return dates.slice(startIndex, endIndex);
    };


    return (
        <div>
            <FormSelect value={month} onChange={handleMonthChange}>
                {months.map((month) => (
                    <option key={month.number} value={month.number}>
                        {month.name}
                    </option>
                ))}
            </FormSelect>

            <div className="d-flex flex-wrap justify-content-center align-items-center my-2">
                <Button variant="light" size="sm" onClick={handlePrevPage} disabled={currentPage === 0}>
                    Prev
                </Button>
                {getVisibleDates().map((dateObj, index) => (
                    <Button className="mx-2 bg-rose-300" key={index} value={dateObj}
                        onClick={(e) => setDay(e.target.value)}>
                        {dateObj}
                    </Button>
                ))}
                <Button variant="light" size="sm" onClick={handleNextPage} disabled={currentPage === (Math.ceil(dates.length / 4) - 1)}>
                    Next
                </Button>
            </div>

            <div className="flex flex-wrap justify-center">
                {moods.map((mood, index) => (
                    <Button key={index} className="mx-2 bg-rose-300" value={mood}
                        onClick={(e) => setMood(e.target.value)}>
                        {mood}
                    </Button>

                ))}
            </div>
        </div>
    );
}

