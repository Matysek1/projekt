import React from 'react';
import { Button } from '~/components/ui/button';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <Button variant="outline" size="sm">
        Nápověda
      </Button>
      <Button variant="outline" size="sm">
        Zobrazit stránku
      </Button>
    </header>
  );
}
