import React from 'react';
import {FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode;
    className?: string;
    id: string
}

const Container: FC<ContainerProps> = ({ children, className, id }) => {
    return <section className={`container mx-auto px-5 lg:px-0 ${className}`} id={id}>{children}</section>
};

export default Container;