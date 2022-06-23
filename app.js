function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
	data() {
		return {
			pikachuHealth: 100,
			gastlyHealth: 100,
			currentRound: 0,
			winner: null,
			logTable: [],
		}
	},
	computed: {
		gastlyStyles() {
			if (this.gastlyHealth < 0) {
				return { width: '0%' }
			}
			return { width: this.gastlyHealth + '%' }
		},
		pikachuStyles() {
			if (this.pikachuHealth < 0) {
				return { width: '0%' }
			}
			return { width: this.pikachuHealth + '%' }
		},
		disabledGame() {
			return this.currentRound % 3 !== 0
		},
	},
	watch: {
		pikachuHealth(value) {
			if (value <= 0 && this.gastlyHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'gastly'
			}
		},
		gastlyHealth(value) {
			if (value <= 0 && this.pikachuHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'pikachu'
			}
		},
	},

	methods: {
		attackGastly() {
			this.currentRound++
			const attackValue = getRandomValue(1, 4)
			this.gastlyHealth -= attackValue
			this.addLog('pikachu', 'attack', attackValue)
			this.attackPikachu()
		},
		attackPikachu() {
			const attackValue = getRandomValue(4, 8)
			this.pikachuHealth -= attackValue
			this.addLog('gastly', 'pikachu', attackValue)
		},
		specialAttackGastly() {
			this.currentRound++
			const attackValue = getRandomValue(3, 10)
			this.gastlyHealth -= attackValue
			this.addLog('pikachu', 'attack', attackValue)
			this.attackPikachu()
		},
		healPikachu() {
			this.currentRound++
			const healValue = getRandomValue(4, 10)
			if (this.pikachuHealth + healValue > 100) {
				this.pikachuHealth = 100
			} else {
				this.pikachuHealth += healValue
			}
			this.addLog('pikachu', 'heal', healValue)
			this.attackPikachu()
		},
		newGame() {
			this.pikachuHealth = 100
			this.gastlyHealth = 100
			this.winner = null
			this.currentRound = 0
			this.logTable = []
		},
		surrender() {
			this.winner = 'gastly'
		},
		addLog(who, what, value) {
			this.logTable.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			})
		},
	},
})

app.mount('#game')
