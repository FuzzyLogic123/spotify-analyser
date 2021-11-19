import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

function Ball({ size, color, left, top, offset, depth }) {
    const { scrollYProgress } = useViewportScroll()
    const ballStyle = {
        width: size,
        height: size,
        top: top,
        left: left,
        backgroundColor: color,
        borderRadius: '100rem',
    }
    const y = useTransform(scrollYProgress, [0, 5], [0.1, offset]);
    return (
            <motion.div className={`ball ${depth}`} style={{ y }}>
                <div className='ball' style={ballStyle}></div>

            </motion.div>
    );
}

export default Ball;