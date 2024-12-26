const SNOWFLAKE_COUNT = 100; // Number of snowflakes
const SNOWFLAKE_SIZE_RANGE = { min: 2, max: 6 }; // Snowflake size range
const SNOWFLAKE_SPEED_RANGE = { min: 1, max: 3 }; // Falling speed range

let snowflakes = [];
let animationFrameId;

const createSnowflake = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: Math.random() * (SNOWFLAKE_SIZE_RANGE.max - SNOWFLAKE_SIZE_RANGE.min) + SNOWFLAKE_SIZE_RANGE.min,
    speed: Math.random() * (SNOWFLAKE_SPEED_RANGE.max - SNOWFLAKE_SPEED_RANGE.min) + SNOWFLAKE_SPEED_RANGE.min,
    opacity: Math.random() * 0.5 + 0.5
});

const setupCanvas = () => {
    const canvas = document.querySelector('.snowverlay');
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return { canvas, ctx };
};

const drawSnowflake = (ctx, snowflake) => {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
    ctx.fill();
};

const animateSnowflakes = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        snowflake.y += snowflake.speed;
        snowflake.x += Math.sin(snowflake.y / 50) * 0.5;

        if (snowflake.y > canvas.height) {
            snowflake.y = -snowflake.size;
            snowflake.x = Math.random() * canvas.width;
        }

        drawSnowflake(ctx, snowflake);
    });

    animationFrameId = requestAnimationFrame(() => animateSnowflakes(ctx, canvas));
};

const startSnowfall = () => {
    const { canvas, ctx } = setupCanvas();
    snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, createSnowflake);

    animateSnowflakes(ctx, canvas);
};

const stopSnowfall = () => {
    cancelAnimationFrame(animationFrameId);
};

document.addEventListener('DOMContentLoaded', startSnowfall);
