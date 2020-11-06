enum Axis {
	x,
	y,
	z,
}

export class Vec3 {
	
	x:number = 0
	y:number = 0
	z:number = 0

	constructor(x?:number, y?:number, z?:number) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0
		
	}
	multiply(vec1:Vec3) : Vec3 {
		this.x *= vec1.x
		this.y *= vec1.y
		this.z *= vec1.z
		return this
	}
	dotProduct(vec1:Vec3): number {
		return this.x*vec1.x + this.y*vec1.y + this.z*vec1.z
	}
	getAngles() : Vec3 {
		let x = this.x
		let y = this.y
		let z = this.z
	
		let angles = new Vec3(0, 0, 0)

		//angles.x = Math.atan2(Math.sqrt(y^2+z^2),x)
		//angles.y = Math.atan2(Math.sqrt(z^2+x^2),y)
		//angles.z = Math.atan2(Math.sqrt(x^2+y^2),z)

		angles.y = Math.asin(-this.y)
		angles.z = Math.atan2(this.x, this.z)
		
		return angles
	}
	rotateFull(angles:Vec3) : Vec3 {
		this.rotate(Axis.z, angles.z)
		this.rotate(Axis.x, angles.x)
		this.rotate(Axis.y, angles.y)

		return this
	}
	rotate(axis:Axis, angle:number) : Vec3 {

		let x1:number = 0
		let y1:number = 0
		let z1:number = 0

		if(axis == Axis.x) {
			x1 = this.x
			y1 = this.y * Math.cos(angle) - this.z * Math.sin(angle)
			z1 = this.y * Math.sin(angle) + this.z * Math.cos(angle)
		}
		if(axis == Axis.y) {
			x1 = this.x * Math.cos(angle) + this.z * Math.sin(angle)
			y1 = this.y
			z1 =-this.x * Math.sin(angle) + this.z * Math.cos(angle)
		}
		if(axis == Axis.z) {
			x1 = this.x * Math.cos(angle) - this.y * Math.sin(angle)
			y1 = this.x * Math.sin(angle) + this.y * Math.cos(angle)
			z1 = this.z
		}

		this.x = x1
		this.y = y1
		this.z = z1
		
		return this
	}
	plus(vec1:Vec3) : Vec3 {
		this.x += vec1.x
		this.y += vec1.y
		this.z += vec1.z
		return this
	}
	subtract(vec1:Vec3) : Vec3 {
		this.x -= vec1.x
		this.y -= vec1.y
		this.z -= vec1.z
		return this
	}
	divide(vec1:Vec3) : Vec3 {
		this.x /= vec1.x
		this.y /= vec1.y
		this.z /= vec1.z
		return this
	}
	string() : string {
		return this.x+' - '+this.y+' - '+this.z
	}
	setMagnitude(newMagnitude:number) : Vec3 {
		let magnitude = this.getMagnitude()

		let x = (this.x/magnitude)*newMagnitude
		let y = (this.y/magnitude)*newMagnitude
		let z = (this.z/magnitude)*newMagnitude

		this.x = x
		this.y = y
		this.z = z

		return this
	}
	getMagnitude() : number {
		let x = this.x
		let y = this.y
		let z = this.z
		let magnitude = Math.sqrt(x*x + y*y + z*z)
		return magnitude
	}
	clone() : Vec3 {
		return new Vec3(this.x, this.y, this.z)
	}
	compare(vec:Vec3) : boolean {
		if(vec.x == this.x && vec.y == this.y && vec.z == this.z) return true
		else return false
	}
	getDistanceTo(vec1:Vec3) : number {
		return this.clone().subtract(vec1).getMagnitude()
	}
	round() : Vec3 {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)
		this.z = Math.round(this.z)
		return this
	}
	randomizeInBall(i:number) : Vec3 {
		this.x = (Math.random()*i)-i/2
		this.y = (Math.random()*i)-i/2
		this.z = (Math.random()*i)-i/2
		let magnitude = this.getMagnitude()
		if(magnitude > i) this.setMagnitude(i)
		return this
	}
	randomizeInCube(i:number) : Vec3 {
		this.x = (Math.random()*i)-i/2
		this.y = (Math.random()*i)-i/2
		this.z = (Math.random()*i)-i/2
		return this
	}
}