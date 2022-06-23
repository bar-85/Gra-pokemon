function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
	data() {
		return {
			pikachuHealthValue: 100,
			gastlyHealthValue: 100,
			currentRoundValue: 0,
			winnerbattle: null,
			logTableMessage: [],
		}
	},
	computed: {
		gastlyStyles() {
			if (this.gastlyHealthValue < 0) {
				return { width: '0%' }
			}
			return { width: this.gastlyHealthValue + '%' }
		},
		pikachuStyles() {
			if (this.pikachuHealthValue < 0) {
				return { width: '0%' }
			}
			return { width: this.pikachuHealthValue + '%' }
		},
		disabledGame() {
			return this.currentRoundValue % 3 !== 0
		},
	},
	watch: {
		pikachuHealthValue(value) {
			if (value <= 0 && this.gastlyHealthValue <= 0) {
				this.winnerbattle = 'draw'
			} else if (value <= 0) {
				this.winnerbattle = 'gastly'
			}
		},
		gastlyHealthValue(value) {
			if (value <= 0 && this.pikachuHealthValue <= 0) {
				this.winnerbattle = 'draw'
			} else if (value <= 0) {
				this.winnerbattle = 'pikachu'
			}
		},
	},

	methods: {
		attackGastly() {
			this.currentRoundValue++
			const attackValue = getRandomValue(1, 4)
			this.gastlyHealthValue -= attackValue
			this.addLog('pikachu', 'attack', attackValue)
			this.attackPikachu()
		},
		attackPikachu() {
			const attackValue = getRandomValue(4, 8)
			this.pikachuHealthValue -= attackValue
			this.addLog('gastly', 'pikachu', attackValue)
		},
		specialAttackGastly() {
			this.currentRoundValue++
			const attackValue = getRandomValue(3, 10)
			this.gastlyHealthValue -= attackValue
			this.addLog('pikachu', 'attack', attackValue)
			this.attackPikachu()
		},
		healPikachu() {
			this.currentRoundValue++
			const healValue = getRandomValue(4, 10)
			if (this.pikachuHealthValue + healValue > 100) {
				this.pikachuHealthValue = 100
			} else {
				this.pikachuHealthValue += healValue
			}
			this.addLog('pikachu', 'heal', healValue)
			this.attackPikachu()
		},
		newGame() {
			this.pikachuHealthValue = 100
			this.gastlyHealthValue = 100
			this.winnerbattle = null
			this.currentRoundValue = 0
			this.logTableMessage = []
		},
		surrender() {
			this.winnerbattle = 'gastly'
		},
		addLog(who, what, value) {
			this.logTableMessage.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			})
		},
	},
})

app.mount('#game')
