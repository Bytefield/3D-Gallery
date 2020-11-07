const images = {
    path: "./assets/images/",
    names: [
        "1.jpg","2.jpg","3.jpg","4.png","5.jpg","6.jpg","7.jpeg","8.jpg","9.jpg","10.jpg","11.jpg","1.jpg","2.jpg","3.jpg","4.png","5.jpg","6.jpg","7.jpeg","8.jpg","9.jpg","10.jpg","11.jpg"
    ]
}

var paintImages = (() => {
    let counter = 1;
    let gallery = document.querySelector(".gallery");
    for(index in images.names) {

        // When first of 3 create and insert a div to group images
        if (index % 3 == 0)  {
            groupDom = document.createElement('div');
            groupDom.classList.add('group')
            gallery.append(groupDom);
        }

        // Inserting 3 images in each group
        let currentGroupIndex = parseInt(index/3)
        let currentGroup = document.querySelectorAll('.group')[currentGroupIndex]
        if (currentGroup) {
            currentImage = document.createElement('div')
            currentImage.classList.add('image');
            currentImage.classList.add(counter == 1 ? 'center' : counter == 2 ? "left" : "right");
            currentImage.style.cssText += "background-image: url('" + images.path + images.names[index] + "');"
            currentGroup.append(currentImage)
        }
        if (counter == 3) counter = 0
        counter++
    }

    // Placing groups in its respective position
    let iteration = 1
    let layer = 1;
    var rotation_angle = null;
    let distance = null;
    var groupsArray = [...document.querySelectorAll('.group')];
    groupsArray.map((e,i) => {
        distance = (layer - 1) * (-6000)
        if(layer % 2 == 0) {
            if(iteration == 1) {
                rotation_angle = 45;
                iteration++;
            } else {
                rotation_angle = -45;
                iteration = 1;
                layer++
            }
            e.style.transform = "rotateY(" + rotation_angle + "deg) translateZ(" + distance + "px)";

            // Storing values for later easier retrieval
            e.setAttribute('data-rotate_y', rotation_angle);
            e.setAttribute('data-translate_z', distance);
        } else if (layer % 2 != 0 && layer != 1) {
            if(iteration == 1) {
                rotation_angle = 0;
                iteration++;
            } else if (iteration == 2) {
                rotation_angle = 60;
                iteration++;
            } else {
                rotation_angle = -60;
                iteration = 1;
                layer++
            }
            e.style.transform = "rotateY(" + rotation_angle + "deg) translateZ(" + distance + "px)";

            // Storing values for later easier retrieval
            e.setAttribute('data-rotate_y', rotation_angle);
            e.setAttribute('data-translate_z', distance);
        } else {
            rotation_angle = 0;
            e.style.transform = "rotateY(" + rotation_angle + "deg) translateZ(" + distance + "px)";
            layer++
        }
    })
})();


// Getting image we want to focus on
var rotate_y = null;
var translate_z = null;
var layer = 1;
imagesArray = [...document.querySelectorAll('.image')];
imagesArray.map((element) => {
    element.addEventListener('click', function(event) {

        // Getting rotation angle and trasnlation from data attributes
        target = event.target
        target_group = target.parentNode
        let rotate_y = parseInt(target_group.getAttribute('data-rotate_y'));
        let translate_z = parseInt(target_group.getAttribute('data-translate_z'));
        layer = parseInt(target_group.getAttribute('data-layer'));

        gsap.to('.gallery', {
            duration: 5,
            z: -1 * translate_z,
            rotateY: -1 * rotate_y
        });

        if (target.hasAttribute('data-selected')) {
            gsap.to(target, {
                duration: 1,
                z: 0,
                x: 0,
                rotateY: 0
            });
            // gsap.to('.gallery', {
            //     z: 0
            // })
            gsap.to('.scene', {
                z: 0,
                rotateY: 0
            })
            document.removeEventListener('mousemove', rotate_gallery);
            target.classList.add('active');
            target.style.top = 0;
            target.style.left = 0;
            target.style.width = "100vw";
            target.style.height = "100vh";
            target.style.backgroundSize = "cover";
        } else {
            itemPrevSelected = document.querySelector('[data-selected]');
            if (itemPrevSelected) itemPrevSelected.removeAttribute('data-selected')
            element.setAttribute('data-selected', true)
        }

    })
})

var window_width = window.innerWidth;
var window_center_x = window.innerWidth / 2;
var window_height = window.innerHeight;
var window_center_y = window.innerHeight / 2;

var rotate_gallery = function(event) {
    let x = event.clientX;
    let y = event.clientY;

    let rotation_angle_Y = 180 * (x - window_center_x)/window_width;
    let rotation_angle_X = -15 * (y - window_center_y)/window_height;

    gsap.to('.scene', {
        rotateY: rotation_angle_Y ,
        rotateX: rotation_angle_X
    })
}

document.addEventListener('mousemove', rotate_gallery);

// @todo: get image size
// @todo: create 3d box = wall
// @todo: hang image in wall

// Testing getting image natural size
// window.onload = function() {

//     var imagesArray = [...document.querySelectorAll('.image')];
//     imagesArray.map((e) => {
//         e.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
//     })
//     var imageSrc = document
//                     .getElementById()
//                      .style
//                       .backgroundImage
//                        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
//                         .split(',')[0];

//     // I just broke it up on newlines for readability

//     var image = new Image();
//     image.src = imageSrc;

//     var width = image.width,
//         height = image.height;

//     alert('width =' + width + ', height = ' + height)

// }