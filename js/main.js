'use strict';
const squery = document.querySelectorAll('.field-item'); // Список с квадратами
var firstPlayer = true; // Первый игрок
var secondPlayer = false; // Второй игрок
var win = false; // Переменная для определения победителя
var draw = false; // Переменная для определения ничьей
document.getElementById('hidden__window').hidden = true; // Скрываем модальное окно

var scoreFirstPlayer = document.getElementById('scoreFirstPlayer');
var scoreSecondPlayer = document.getElementById('scoreSecondPlayer');
var coutingScoreFirstPlayer = 0;
var coutingScoreSecondPlayer = 0;

// Перебор списка с квадратами (item - квадрат, по которому нажали)
squery.forEach(function (item) {
	// Проверка на нажатии по квадрату
	item.addEventListener('click', function () {
		// Если ходит первый игрок
		if (firstPlayer) {
			//if (item.classList.contains('pull')) continue;
			item.classList.add('cross'); // Присваивание квадрату класса с крестиком
			item.classList.add('pull'); // Присваивание квадрату класса, по которому определяется, был ли нажат квадрат
			// Перераспределение ходов игроков
			firstPlayer = false;
			secondPlayer = true;

			win = checkFirstPlayerWin(); // Проверка на победу первого игрока
			draw = checkDraw(); // Проверка на ничью
			// Если победил первый игрок
			if (win) {
				modalWindow('First');
				coutingScoreFirstPlayer++;
				scoreFirstPlayer.innerHTML = coutingScoreFirstPlayer;
			}
			//Если ничья
			else if (draw) {
				modalWindow('Drawn')
			}
		}
		// Если ходит второй игрок
		else if (secondPlayer) {
			//if (item.classList.contains('pull')) continue;
			item.classList.add('minus'); // Присваивание класса с нуликом
			item.classList.add('pull'); // Присваивание квадрату класса, по которому определяется, был ли нажат квадрат


			// Перераспределение ходов игроков
			firstPlayer = true;
			secondPlayer = false;

			win = checkSecondPlayerWin(); // Проверка на победу второго игрока
			draw = checkDraw(); // Проверка на ничью
			// Если победил первый игрок
			if (win) {
				modalWindow('Second');
				coutingScoreSecondPlayer++;
				scoreSecondPlayer.innerHTML = coutingScoreSecondPlayer;
			}
			// Если ничья
			else if (draw) {
				modalWindow('Drawn')
			}
		}
	}, false);
});

// Проверка на победу.
// Функция работает по следующему образу:
// 1. Используется if-else;
// 2. с помощью .contains определяется, есть ли у квадрата класс с именем cross;
// 3. если класс имеется, и совпадает с выиграшной последовательностью, то игрок выиграл.
// Проверка для второго игрока работает также, только заместо класса cross класс minus.
function checkFirstPlayerWin() {
	if (squery[0].classList.contains('cross') & squery[4].classList.contains('cross') & squery[8].classList.contains('cross')) {
		return true;
	}
	else if (squery[2].classList.contains('cross') & squery[4].classList.contains('cross') & squery[6].classList.contains('cross')) {
		return true;
	}
	else if (squery[0].classList.contains('cross') & squery[3].classList.contains('cross') & squery[6].classList.contains('cross')) {
		return true;
	}
	else if (squery[1].classList.contains('cross') & squery[4].classList.contains('cross') & squery[7].classList.contains('cross')) {
		return true;
	}
	else if (squery[2].classList.contains('cross') & squery[5].classList.contains('cross') & squery[8].classList.contains('cross')) {
		return true;
	}
	else if (squery[0].classList.contains('cross') & squery[1].classList.contains('cross') & squery[2].classList.contains('cross')) {
		return true;
	}
	else if (squery[3].classList.contains('cross') & squery[4].classList.contains('cross') & squery[5].classList.contains('cross')) {
		return true;
	}
	else if (squery[6].classList.contains('cross') & squery[7].classList.contains('cross') & squery[8].classList.contains('cross')) {
		return true;
	}
}

function checkSecondPlayerWin() {
	if (squery[0].classList.contains('minus') & squery[4].classList.contains('minus') & squery[8].classList.contains('minus')) {
		return true;
	}
	else if (squery[2].classList.contains('minus') & squery[4].classList.contains('minus') & squery[6].classList.contains('minus')) {
		return true;
	}
	else if (squery[0].classList.contains('minus') & squery[3].classList.contains('minus') & squery[6].classList.contains('minus')) {
		return true;
	}
	else if (squery[1].classList.contains('minus') & squery[4].classList.contains('minus') & squery[7].classList.contains('minus')) {
		return true;
	}
	else if (squery[2].classList.contains('minus') & squery[5].classList.contains('minus') & squery[8].classList.contains('minus')) {
		return true;
	}
	else if (squery[0].classList.contains('minus') & squery[1].classList.contains('minus') & squery[2].classList.contains('minus')) {
		return true;
	}
	else if (squery[3].classList.contains('minus') & squery[4].classList.contains('minus') & squery[5].classList.contains('minus')) {
		return true;
	}
	else if (squery[6].classList.contains('minus') & squery[7].classList.contains('minus') & squery[8].classList.contains('minus')) {
		return true;
	}
}

// Проверка на ничью.
// Проверка работает следующим образом:
// 1. Объявляется переменная суммы совпадений;
// 2. включается цикл, где происходит суммирование совпадений (суммирование происходит только тогда, когда квадрат имеет класс pull);
// 3. возвращает true, если сумма совпадение равна количеству квадратов;
// 4. возвращает false, если сумма совпадений не равна количеству квадратов.
function checkDraw() {
	let j = 0;
	for (let i = 0; i < squery.length; i++) {
		if (squery[i].classList.contains('pull')) j++;
	}
	if (j === squery.length) return true;
	else return false;
}

// Функция вызова модального окна.
function modalWindow(player) {
	document.getElementById('hidden__window').hidden = false; // Включение модального окна.
	// Вывод в модальном текста относительно отправленного в функцию текста (кто выиграл или ничья).
	if (player === 'First') document.querySelector('.window-text').innerHTML += '<h2>First player win!</h2>'
	else if (player === 'Second') document.querySelector('.window-text').innerHTML += '<h2>Second player win!</h2>'
	else if (player === 'Drawn') document.querySelector('.window-text').innerHTML += '<h2>DRAWN!</h2>'
}

// Функция для кнопки повтора.
document.getElementById('reset').addEventListener('click', function () {
	// Обнуление классов, которые были получены во время игры, у кнопок.
	for (let i = 0; i < squery.length; i++) {
		squery[i].classList.remove('cross');
		squery[i].classList.remove('minus');
		squery[i].classList.remove('pull');
	}
	win = false; // Обнуление победителя.
	draw = false; // Обнуление ничьей.
	document.getElementById('hidden__window').hidden = true; // Закрытие модального окна.
	document.querySelector('.window-text > h2').remove(); // Обнуление текста в модальном окне.
}, false);