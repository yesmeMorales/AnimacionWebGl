(function(){
	//Definimoc nuestra escena. clase Scene de TREE
	let scene= new THREE.Scene();
	const aspectRatio=window.innerWidth / window.innerHeight;

	//Definimos la camara
	let camera=new THREE.PerspectiveCamera(75,aspectRatio,0.1,100);
	//Definir el render
	let renderer= new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//Activa el calculo del mapa de sombras dentro del renderer
	renderer.shadowMap.enabled= true;
	//Suavisamos la sobra
	renderer.shadowMap.soft= true;
	//Tipo de sombra
	renderer.shadowMap.type= THREE.PCFShadowMap;

	//Situamos la cámara
	camera.position.z=65;
	camera.position.y=20; //Elevamos la camára
	camera.position.x=1; //Alejamos la cámara


	let planeGeometry= new THREE.PlaneGeometry(250,200);
	planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
	let groundMaterial=new THREE.MeshPhongMaterial({
		color: 0x222222
	});

	let plane= new THREE.Mesh(planeGeometry,groundMaterial);
	//Nuestro Plano recibira sombra
	plane.receiveShadow= true;



	let mesh;
	//Creamos una nueva textura
	let loader=new THREE.TextureLoader();
	//Cargamos la textura tierra2.jpg
	loader.load('tierra2.jpg',function(texture){
		//Creamos la esfera de la tierra (radio,cantidad de segmentos,)
		let geometry=new THREE.SphereGeometry(13,100,100);
		//Creamos la apariencia de la textura
		let material=new THREE.MeshBasicMaterial({
			map: texture
		});
		//Generamos la esfera y le aplicamos la apariencia
		mesh = new THREE.Mesh(geometry,material);
		//Posiciones en X,Y,Z de la esfera 
		mesh.position.y = 20;
		mesh.position.x= 1;
		mesh.position.z=2;
		//Proyectara sombra
		mesh.castShadow= true;
		//Agregamos la esfera a la escena
		scene.add(mesh);
		loop();
	})

	let luna;
	let loader2=new THREE.TextureLoader();
	loader2.load('moon2.jpg',function(texture2){
		let geometry2=new THREE.SphereGeometry(5,100,100);
		let material2=new THREE.MeshBasicMaterial({
			map: texture2
		});
		luna = new THREE.Mesh(geometry2,material2);
		luna.position.y = 20;
		luna.position.x= 1;
		luna.position.z= 1;

		//Proyectara sombra
		luna.castShadow= true;

		scene.add(luna);
		loop();
	})
	

	//forma que tendra lo que vamos a mostrar
	//let geometry= new THREE.BoxGeometry(10,10,10);

	//
	//let mesh=new THREE.Mesh(geometry,groundMaterial);
	let pointLight=new THREE.PointLight(0xdfebff);
	pointLight.position.y=60;
	pointLight.position.z=20;


	//Le decimos a nuestra luz que proyectara sombras
	pointLight.castShadow= true;

	//let helper =  new THREE.CameraHelper(pointLight.shadow.camera);

	scene.background=new THREE.Color(0xeeeeee);
	//agregamos la malla a la escena
	//scene.add(mesh);
	//scene.add(helper);
	scene.add(plane);
	//Añadimos las luces a la escena
	scene.add(pointLight);
	let controls= new THREE.OrbitControls(camera,renderer.domElement);


	//funcion recursiva para llamar a los fotogramas 
	var step=0;
	function loop(){
		requestAnimationFrame(loop);
		mesh.rotation.y += 0.009;
		//luna.translate.y += 0.09;
		//luna.rotation.x += 0.02;
		//luna.rotation.y += 0.009;
		step+=0.009;

		luna.position.z=2+(40*(Math.sin(step)));
		luna.position.x=20+(55*(Math.cos(step)));
		//Renderizamos la escena
		renderer.render(scene,camera);
	}
	
	

})();