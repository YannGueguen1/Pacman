var pos = 0;
    const pacArray = [
        ['images/PacMan1.png', 'images/PacMan2.png'],
        ['images/PacMan3.png', 'images/PacMan4.png']
    ];
    // let pacState = 0;
    // let pacDirection = 0;
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen
    let minHeight = 165; // To clear instruction text

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        position.y += minHeight;
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[0][0];
        newimg.width = 100;
        newimg.style.left = position.x + "px";
        newimg.style.top = position.y + "px";
        let pacState = 0;
        let pacDirection = 0;

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg,
            pacState,
            pacDirection
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style["left"] = item.position.x + "px";
            item.newimg.style["top"] = item.position.y + "px";

            item.pacState = 1 - item.pacState;
            if (item.velocity.x>0) {
                item.pacDirection = 0;
            } else {
                item.pacDirection = 1;
            }
            // console.log("pacState: " + pacState + "pacDirection: " + pacDirection)
            // console.log("src start" + item.newimg.src)
            item.newimg.src = pacArray[item.pacDirection][item.pacState];
            // console.log("src end" + item.newimg.src)
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
            item.velocity.x =- item.velocity.x;
        };
        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < minHeight) {
            item.velocity.y =- item.velocity.y
        };
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }