AFRAME.registerComponent('random-color', {
  dependencies: ['material'],

  init: function () {
    this.el.setAttribute('material', 'color', getRandomColor());
  }
})

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color ='#'
  for(var i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Snap entity to the closest interval specified by `snap`.
 * Offset entity by `offset`.
 */
AFRAME.registerComponent('snap', {
  dependencies: ['position'],

  schema: {
    offset: {type: 'vec3'},
    snap: {type: 'vec3'}
  },

  init: function () {
    this.originalPos = this.el.getAttribute('position');
  },

  update: function () {
    const data = this.data;

    const pos = AFRAME.utils.clone(this.originalPos);
    pos.x = Math.floor(pos.x / data.snap.x) * data.snap.x + data.offset.x;
    pos.y = Math.floor(pos.y / data.snap.y) * data.snap.y + data.offset.y;
    pos.z = Math.floor(pos.z / data.snap.z) * data.snap.z + data.offset.z;

    this.el.setAttribute('position', pos);
  }
});

document.querySelector('#blockHand').addEventListener('click', function() {
  var newVoxelEl = document.createElement('a-entity');
  newVoxelEl.setAttribute('mixin', 'voxel');

  // snap it to the closest half meter
  newVoxelEl.setAttribute('position', evt.detail.intersection.point);

  this.appendChild(newVoxelEl);
})

/**
 * Spawn entity at the intersection point on click, given the properties passed.
 *
 * `<a-entity intersection-spawn="mixin: box; material.color: red">` will spawn
 * `<a-entity mixin="box" material="color: red">` at intersection point.
 */
AFRAME.registerComponent('intersection-spawn', {
  schema: {
    default: '',
    parse: AFRAME.utils.styleParser.parse
  },

  init: function () {
    const data = this.data;
    const el = this.el;

    el.addEventListener(data.event, evt => {
      // Create element.
      const spawnEl = document.createElement('a-entity');

      // Snap intersection point to grid and offset from center.
      spawnEl.setAttribute('position', evt.detail.intersection.point);

      // Set components and properties.
      Object.keys(data).forEach(name => {
        if (name === 'event') { return; }
        AFRAME.utils.entity.setComponentProperty(spawnEl, name, data[name]);
      });

      // Append to scene.
      el.sceneEl.appendChild(spawnEl);
    });
  }
});