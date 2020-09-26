import React, { useState } from 'react';

export default useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(bsSize());

    window.addEventListener("resize", () => {
        const size = bsSize();

        if (screenSize !== size)
            setScreenSize(size);
    });

    return screenSize;
}