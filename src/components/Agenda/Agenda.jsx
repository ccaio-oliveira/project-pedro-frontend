import { useState } from "react";
import CalendarDays from "./CalendarDays/CalendarDays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BtnPassMonth, Calendar, CalendarBody, CalendarHeader, MonthTitle, PassMonth, TableHeader, WeekDay } from "./Agenda.styles";
import { PropTypes } from 'prop-types';
import ModalRelatoriosData from "./ModalRelatoriosData/ModalRelatoriosData";

library.add(faChevronLeft, faChevronRight);

const Agenda = ({ relatorios }) => {
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const [data, setData] = useState(new Date());
    const [openModalDay, setOpenModalDay] = useState(false);
    const [relatoriosModa, setRelatoriosModal] = useState([]);

    const changeCurrentDay = (day, relatorio) => {
        setData(new Date(day.year, day.month, day.number));

        if(relatorio){
            setRelatoriosModal(relatorio);
            setOpenModalDay(true);
        }
    }

    const handleMonth = (action) => {
        if(action === 'next'){
            setData(new Date(data.getFullYear(), data.getMonth() + 1, 1));
        } else {
            setData(new Date(data.getFullYear(), data.getMonth() - 1, 1));
        }
    }

    const closeModalDay = () => {
        setOpenModalDay(false);
    }

    return(
        <>
            <Calendar>
                <CalendarHeader>
                    <MonthTitle>
                        {months[data.getMonth()]} {data.getFullYear()}
                    </MonthTitle>
                    <PassMonth>
                        <BtnPassMonth onClick={() => handleMonth('past')}>
                            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                        </BtnPassMonth>
                        <BtnPassMonth onClick={() => handleMonth('next')}>
                            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                        </BtnPassMonth>
                    </PassMonth>
                    
                </CalendarHeader>
                <CalendarBody>
                    <TableHeader>
                        {weekDays.map((weekday, index) => {
                            return <WeekDay key={index}>
                                <p>
                                    {weekday}
                                </p>
                            </WeekDay>
                        })}
                    </TableHeader>
                    <CalendarDays data={data} changeCurrentDay={changeCurrentDay} relatorios={relatorios} />
                </CalendarBody>
            </Calendar>

            {openModalDay && (
                <ModalRelatoriosData achado={relatoriosModa} onClose={closeModalDay} />
            )}
        </>
    )
}

Agenda.propTypes = {
    relatorios: PropTypes.array
}

export default Agenda;