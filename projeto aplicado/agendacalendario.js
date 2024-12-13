        let currentDate = new Date();

        function generateCalendar() {
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear(); 

            
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            
            document.getElementById('month-year').textContent = `${getMonthName(month)} ${year}`;

            
            const calendarElement = document.getElementById('calendar');
            calendarElement.innerHTML = ''; 

            
            const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
            const headerRow = document.createElement('div');
            headerRow.classList.add('calendar-row');
            weekdays.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day');
                dayElement.textContent = day;
                headerRow.appendChild(dayElement);
            });
            calendarElement.appendChild(headerRow);

            
            let currentDay = 1;
            const totalRows = Math.ceil((firstDayOfMonth + daysInMonth) / 7);
            for (let row = 0; row < totalRows; row++) {
                const rowElement = document.createElement('div');
                rowElement.classList.add('calendar-row');

                for (let col = 0; col < 7; col++) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day');

                    
                    if (row === 0 && col < firstDayOfMonth) {
                        
                        dayElement.classList.add('empty');
                    } else if (currentDay <= daysInMonth) {
                        dayElement.textContent = currentDay;
                        dayElement.dataset.day = currentDay; 

                        
                        dayElement.addEventListener('click', function() {
                            document.getElementById('event-date').value = `${year}-${month + 1}-${currentDay}`;
                        });

                        currentDay++;
                    }
                    rowElement.appendChild(dayElement);
                }

                calendarElement.appendChild(rowElement);
            }
        }

        
        function changeMonth(direction) {
            currentDate.setMonth(currentDate.getMonth() + direction);
            generateCalendar();
        }

        
        function getMonthName(monthIndex) {
            const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            return months[monthIndex];
        }

        
        function addEvent() {
            var eventDate = document.getElementById('event-date').value;
            var eventDescription = document.getElementById('event-description').value;

            if (eventDate && eventDescription) {
                var dayNumber = new Date(eventDate).getDate();
                var dayElements = document.querySelectorAll('.calendar-day');

                dayElements.forEach(function(dayElement) {
                    if (parseInt(dayElement.dataset.day) === dayNumber) {
                        var eventElement = document.createElement('div');
                        eventElement.classList.add('event');
                        eventElement.textContent = eventDescription;
                        dayElement.appendChild(eventElement);
                    }
                });

                document.getElementById('event-date').value = '';
                document.getElementById('event-description').value = '';
            } else {
                alert('Por favor, preencha todos os campos!');
            }
        }

        
        generateCalendar();