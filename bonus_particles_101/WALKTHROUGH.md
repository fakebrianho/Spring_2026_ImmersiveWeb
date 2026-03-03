# Project 001: Basic Particles — Walkthrough & Concepts

This guide explains **particle basics** and walks through the minimal particle setup in this project.

---

## Part 1: Basic Concepts of Particles

### What is a particle?

In 3D graphics, a **particle** is a small, simple shape (usually a point or quad) drawn at a position in 3D space. Unlike a mesh (which has faces and can be lit), particles are typically:

- **Lightweight** — many can be drawn in one draw call
- **Position-only** — each particle is mainly defined by (x, y, z)
- **Optional extras** — size, color, opacity, texture can be added later

Used for: dust, snow, sparks, stars, confetti, smoke, crowds, etc.

### Three.js particle building blocks

| Concept | Role |
|--------|------|
| **Positions** | A flat array of numbers: `[x0,y0,z0, x1,y1,z1, ...]` — one (x,y,z) per particle |
| **BufferGeometry** | Holds this data and tells the GPU where each “vertex” (here, particle) is |
| **BufferAttribute** | Wraps the array and says “this is position data, 3 components per item” |
| **PointsMaterial** | How each point is drawn: color, size, etc. |
| **Points** | The object that combines geometry + material and is added to the scene |

So: **positions array → BufferGeometry (with position attribute) → PointsMaterial → THREE.Points**.

### Why “points” and not “particles”?

In Three.js, the object is called **`THREE.Points`**. Each vertex in the geometry is drawn as a small point (or sprite). So “particles” in this project are literally **points** rendered with **PointsMaterial**.

---

## Part 2: Step-by-Step Walkthrough

### Step 1: Decide how many particles

```js
const count = 1000
```

We’ll draw **1000** points. More = denser effect but more GPU work.

---

### Step 2: Create a positions array

```js
const positions = new Float32Array(count * 3)
```

- **`count * 3`** because each particle needs **3 numbers**: x, y, z.
- **`Float32Array`** is a typed array of 32-bit floats — what the GPU expects for attributes (efficient and precise enough).

So we reserve space for **3000** numbers: 1000 × (x, y, z).

---

### Step 3: Fill the array with random positions

```js
for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10
}
```

- **`Math.random()`** gives 0 to 1. **`- 0.5`** shifts that to **-0.5 to 0.5** (centered around 0).
- **`* 10`** scales to **-5 to 5** in each axis.

So particles are spread in a **10×10×10** box centered at the origin. We’re not treating “particle index” specially — we just fill the array sequentially (x, y, z, x, y, z, …).

---

### Step 4: Create geometry and attach the position attribute

```js
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
```

- **`BufferGeometry`** holds attribute data for one “thing” (here, 1000 points).
- **`setAttribute('position', ...)`** — the name `'position'` is required; the vertex shader uses it for each point’s position.
- **`BufferAttribute(positions, 3)`** means: “this array has **3 components per vertex**” (x, y, z).

So the geometry now means: “1000 vertices, each with a position from our array.”

---

### Step 5: Create the material

```js
const material = new THREE.PointsMaterial({
	color: 0xffffff,
	size: 0.1,
})
```

- **`PointsMaterial`** is the built-in material for **Points**: color, size, optional map, etc.
- **`color: 0xffffff`** — white (hex RGB).
- **`size: 0.1`** — each point is drawn 0.1 units wide (in world units by default, unless `sizeAttenuation` is changed).

---

### Step 6: Create the Points object and return it

```js
return new THREE.Points(geometry, material)
```

- **`THREE.Points(geometry, material)`** is like **`THREE.Mesh(geometry, material)`**, but for points: it draws one point per vertex.
- This object can be added to the scene, moved, rotated, and animated like any other Three.js object.

---

## Part 3: How it’s used in the app

In **`main.js`**:

1. **Create the particle system:**
   ```js
   meshes.points = addParticles()
   ```
2. **Add it to the scene:**
   ```js
   scene.add(meshes.points)
   ```

The render loop already does `renderer.render(scene, camera)`, so the points are drawn every frame. No per-particle animation is applied in 001 — they stay where they were placed.

---

## Quick reference: data flow

```
count (1000)
    ↓
Float32Array(count * 3)  ← 3000 floats
    ↓
Fill with (Math.random() - 0.5) * 10  ← random box -5..5
    ↓
BufferGeometry + setAttribute('position', BufferAttribute(positions, 3))
    ↓
PointsMaterial({ color, size })
    ↓
new THREE.Points(geometry, material)
    ↓
scene.add(points)
```

---

## What you can try next

- Change **`count`** (e.g. 100 vs 10000) to see performance and density.
- Change **`size`** in PointsMaterial (e.g. 0.05 or 0.5).
- Change **`color`** (e.g. `0xff0000` for red).
- Change the position formula (e.g. only y: `positions[i] = 0` for x and z, random for y) to get a line or plane of points.
- In the animation loop, rotate the points object:  
  `meshes.points.rotation.y += 0.01`  
  to see the whole cloud spin.

Once this makes sense, project **002** and **003** add textures, colors per particle, and animation.
