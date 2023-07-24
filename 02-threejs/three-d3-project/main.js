console.log('main.js linked')

//==== libraries and addons
import * as THREE from 'three'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import datgui from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/+esm'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

//==== set global variables
const SCENE_WIDTH = container.clientWidth
const SCENE_HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = SCENE_WIDTH / SCENE_HEIGHT
const NEAR = 0.01
const FAR = 100

//==== create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#233143');

//==== camera
const camera = new THREE.OrthographicCamera( SCENE_WIDTH / - 200, SCENE_WIDTH / 200, SCENE_HEIGHT / 200, SCENE_HEIGHT / - 200, NEAR, FAR );
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

// add grid helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// declare the gui variable
const gui = new datgui.GUI({name: 'Basic D3 Project'});

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 30)
cameraFolder.open()

//==== renderer
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( SCENE_WIDTH, SCENE_HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

/* 
    write a function to fetch data, FIFA World Cup Attendance 
    https://www.kaggle.com/datasets/rajkumarpandey02/fifa-world-cup-attendance-19302022

    Shape of the data object:
    {
      Game(s): "Uruguay 6–1 Yugoslavia, Semi-final"
      Hosts: "Uruguay"
      Matches: 18
      Total_Attendance: 590549
      Venue: "Estadio Centenario, Montevideo"
      Year: 1930
    }
*/
const chart_width = window.innerWidth;
const chart_height = window.innerHeight - 60;
const margin = { top: 30, right: 0, bottom: 60, left: 30 };
const padding = 10;

  // append the svg to the threejs canvas
  let svg = d3
    .select("canvas")
    .append("svg")
      .attr("width", chart_width)
      .attr("height", chart_height)

  d3.csv("assets/fifa_world_cup_attendance/FIFA-World-Cup-Attendance.csv", d3.autoType)
  .then(data => {
    console.log(data)

    // data.forEach((d) => console.log(d.Hosts))
    
    // calculate the width of each bar
    const barWidth = Math.round(chart_width / data.length)
    console.log(barWidth) // 38

    const timeParser = d3.timeParse("%Y");


    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Total_Attendance"])])
      .range([chart_height, 0]);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => timeParser(d["Year"]))) // 1930 -- 2022
      .range([0, chart_width]);

    // Declare the z (horizontal position) scale, Hosts
    const zScale = d3.scaleBand()
      .domain([data, d3.extent(data, function(d) { return d["Hosts"] })]) // Argentina -- West Germany
      .padding(padding);

    let x_axis = d3.axisBottom(xScale);

    let y_axis = d3.axisLeft(yScale);
    
      // build the bars
    svg.selectAll("rect")
      .data(data)
      .enter()
        .append("rect")
        // .attr("y", (d => { 
        //   return yScale(d["Total_Attendance"] * 0.0001)
        // }))
        // .attr("height", (d => { return d["Total_Attendance"] * 0.0001 }))
        .attr("height", d => chart_height - yScale(d["Total_Attendance"]))
        .attr("width", barWidth - padding)
        .attr("transform", ((d, i) => {
          let translate = barWidth * i
          console.log(translate)
          return `translate(${translate}, 0)`
        }))


    const allColors = [
      0xfeffc8, 0xfffec0, 0xfffcb7, 0xfffaaf, 0xfff7a7, 0xfff39f, 0xffef96,
      0xffeb8e, 0xffe686, 0xffe17e, 0xffdb75, 0xffd56d, 0xffce65, 0xffc75c,
      0xffc054, 0xffb84c, 0xffaf44, 0xffa63b, 0xff9d33, 0xff932b, 0xff8922,
      0xff7e1a, 0xff7312, 0xff670a, 0xff5b01, 0xf85100, 0xf04700, 0xe83e00,
      0xdf3600, 0xd72e00,
    ];

    // make a reference to all the svgs
    const svgList = document.querySelectorAll("rect");
    console.log(svgList)
    
    // instantiate a loader
    const loader = new SVGLoader();

    // iterate over each svg element
    for (let i = 0; i < svgList.length; i++) {
      console.log(svgList[i].outerHTML)

      // load a SVG resource
      const svgData = loader.parse(svgList[i].outerHTML);
      console.log(loader)
      const shape = svgData.paths[0].toShapes(true)[0];
      console.log(shape)
  
      const geometry = new THREE.ExtrudeGeometry(shape, {
        steps: 2,
        depth: barWidth,
      });

      const material = new THREE.MeshLambertMaterial({ 
        // color: allColors[svgList.length - i - 1]
        color: 'green'
      });
      
      const mesh = new THREE.Mesh( geometry, material ) ;
      scene.add( mesh );

      mesh.scale.set(0.001, 0.001, 0.001);
      mesh.rotation.x = Math.PI / 180;
      mesh.position.set(0, 0 , 0);


      //

      const allPoints = [
        [new THREE.Vector3(-1, 1, -10.2), new THREE.Vector3(0, 1, -10.2)],
        [new THREE.Vector3(-1, 5, -10.2), new THREE.Vector3(0, 5, -10.2)],
        [new THREE.Vector3(-1, 10, -10.2), new THREE.Vector3(0, 10, -10.2)],
      ]

      const lineMaterial = new THREE.LineDashedMaterial( {
        color: 0xffffff,
        linewidth: 1,
        // scale: 1,
        dashSize: 3,
        gapSize: 3,
      } );

      for (let i = 0; i < allPoints.length; i++) {
        const dataPoints = allPoints[i];
        console.log(dataPoints)
      }

      // lighting

      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(5, 30, 31);
    
      const spotLight2 = new THREE.SpotLight(0xffffff, 0.8);
      spotLight2.position.set(-25, 3, 2);
    
      const spotLight3 = new THREE.SpotLight(0xffffff, 0.2);
      spotLight3.position.set(6, 14, 35);

      spotLight2.castShadow = true;
      spotLight3.castShadow = true;

      spotLight3.shadow.mapSize.width = 1024;
      spotLight3.shadow.mapSize.height = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.mapSize.width = 1024;
      spotLight2.shadow.mapSize.height = 1024;
      spotLight2.shadow.mapSize.width = 1024;

      scene.add(spotLight);
      scene.add(spotLight2);
      scene.add(spotLight3);

  
    }
  });
  
  // add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

// render the updated scene and camera

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();