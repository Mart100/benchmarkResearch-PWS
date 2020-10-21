const balls:Array<Ball> = []

class Ball {
	position: Vec3
	size: number
	constructor(position:Vec3, size:number) {
		this.position = position
		this.size = size
	}
}

interface Intersect {
	ball: Ball
	rayLength: number
	intersectPos: Vec3
}

class Ray {
	position: Vec3
	velocity: Vec3
	constructor(position:Vec3, velocity:Vec3) {
		this.position = position
		this.velocity = velocity

	}
	getClosestBall() {
		let intersects:Array<Intersect> = []
		for(let ball of balls) {
			let eye_to_centerBall = ball.position.clone().subtract(this.position)
			let rayLength = eye_to_centerBall.dotProduct(this.velocity)
			let rayClosestToBall = this.position.clone().plus(this.velocity.clone().setMagnitude(rayLength))
			let rayDistanceToBall = rayClosestToBall.clone().subtract(ball.position).getMagnitude()
			if(rayDistanceToBall < ball.size/2 && rayLength > 0) {
				let dist1 = rayLength-Math.sqrt((ball.size/2)**2 - rayDistanceToBall**2)
				let intersectPos = this.position.clone().plus(this.velocity.clone().setMagnitude(dist1))
				intersects.push({
					ball:ball,
					intersectPos:intersectPos,
					rayLength:rayLength
				})
			}
		}
		let intersectsOrdered = intersects.sort((a, b) => a.rayLength-b.rayLength)
		if(!intersectsOrdered[0]) return
		let firstIntersect = {
			object: intersectsOrdered[0].ball,
			rayLength: intersectsOrdered[0].rayLength,
			intersectPos:  intersectsOrdered[0].intersectPos
		}
		return firstIntersect
	}
}

$(() => {
	startTest()
})

function startTest() {
	spawnRandomBalls(10000)

	let startTime = performance.now()
	let results = []

	// try calculate 1000 rays collision to the balls
	let rayCount = 1000
	for(let i=0;i<rayCount;i++) {
		let newRay = new Ray(
			new Vec3().randomizeInBall(1000),
			new Vec3().randomizeInBall(1),
		)

		let closestBall = newRay.getClosestBall()
		results.push(closestBall)
	}

	let endTime = performance.now()
	let timeDifference = endTime-startTime
	console.log(timeDifference)

}



function spawnRandomBalls(amount:number) : void {
	for(let i=0;i<amount;i++) {
		let newBall = new Ball(
			new Vec3().randomizeInBall(1000),
			Math.random()*50
		)
		balls.push(newBall)
	}
}