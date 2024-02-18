import { PropTypes } from 'prop-types';
import { CalendarDay, CalendarDayGrau, ContainerCalendarGrau, TableContent } from './CalendarDays.styles';

const CalendarDays = ({ data, changeCurrentDay, relatorios }) => {
    const firstDayOfMonth = new Date(data.getFullYear(), data.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    const currentDays = [];

    for(let day = 0; day < 42; day++){
        if(day === 0 && weekdayOfFirstDay === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if(day === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        const calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === data.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === data.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
        
        relatorios.map((relatorio) => {
            const [hora, data] = relatorio.data_criacao.split(' - ');
            const [dia, mes, ano] = data.split('/');
            const date = new Date(`${ano}-${mes}-${dia}T${hora}:00`);
            if(calendarDay.date.toDateString() === date.toDateString()){
                if(!calendarDay.relatorio){
                    calendarDay.relatorio = [];
                }

                calendarDay.relatorio.push(relatorio);
            }
        
        })

        currentDays.push(calendarDay);
    }

    return (
        <TableContent>
            {
                currentDays.map((day, index) => {
                    const elements = [];
                    return(
                        <CalendarDay className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} key={index} onClick={() => changeCurrentDay(day, day.relatorio)}>
                            {day.relatorio && day.relatorio.length > 0 && (
                                <ContainerCalendarGrau>
                                    {/* // insere os graus de relatórios em um array pra validação */}
                                    {day.relatorio.map((relatorio) => {

                                        if(relatorio.grau == 1 && !elements.includes('prioridade')){
                                            elements.push('prioridade');
                                        } else if(relatorio.grau == 2 && !elements.includes('nao_urgente')){
                                            elements.push('nao_urgente');
                                        } else if(relatorio.grau == 3 && !elements.includes('rotina')){
                                            elements.push('rotina');
                                        }
                                    })}
                                    {elements.map((element, index) => {
                                        return(
                                            <CalendarDayGrau grautabela={element} key={index} />
                                        )
                                    })}
                                </ContainerCalendarGrau>
                            )}
                            <p>{day.number}</p>
                        </CalendarDay>
                    )
                })
            }
        </TableContent>
    )
}

CalendarDays.propTypes = {
    data: PropTypes.instanceOf(Date).isRequired,
    changeCurrentDay: PropTypes.func.isRequired,
    relatorios: PropTypes.array
}

export default CalendarDays;