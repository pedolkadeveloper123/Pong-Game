const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 15;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let paddle1Speed = 0;
let paddle2Speed = 0;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameOver) {
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('Parabéns, você venceu!', canvas.width / 2, canvas.height / 2);
        return; // Stop drawing
    }

    // Draw paddles
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(20, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 20 - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw scores
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
    
    // Move paddles
    paddle1Y += paddle1Speed;
    paddle2Y += paddle2Speed;
    
    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Ball collision with top and bottom
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Ball collision with paddles
    if (ballX - ballSize < 20 + paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize > canvas.width - 20 - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    
    // Ball out of bounds
    if (ballX - ballSize < 0) {
        player2Score++;
        if (player2Score >= 20) {
            gameOver = true;
        } else {
            resetBall();
        }
    }
    if (ballX + ballSize > canvas.width) {
        player1Score++;
        if (player1Score >= 20) {
            gameOver = true;
        } else {
            resetBall();
        }
    }
    
    // Paddle boundaries
    if (paddle1Y < 0) paddle1Y = 0;
    if (paddle1Y + paddleHeight > canvas.height) paddle1Y = canvas.height - paddleHeight;
    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y + paddleHeight > canvas.height) paddle2Y = canvas.height - paddleHeight;
    
    requestAnimationFrame(draw);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        paddle2Speed = -6;
    } else if (e.key === 'ArrowDown') {
        paddle2Speed = 6;
    } else if (e.key === 'w') {
        paddle1Speed = -6;
    } else if (e.key === 's') {
        paddle1Speed = 6;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        paddle2Speed = 0;
    }
    if (e.key === 'w' || e.key === 's') {
        paddle1Speed = 0;
    }
});

draw();
