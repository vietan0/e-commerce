import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

function getApiRoutes(dir: string, basePath = '/api'): string[] {
  const routes: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      routes.push(...getApiRoutes(filePath, `${basePath}/${file}`));
    } else if (file === 'route.ts') {
      routes.push(basePath);
    }
  });

  return routes;
}

export async function GET() {
  const apiDir = path.join(process.cwd(), 'app/api');
  const endpoints = getApiRoutes(apiDir);

  return NextResponse.json({
    name: 'e-commerce API',
    version: '1.0.0',
    description: '',
    documentation: '',
    endpoints,
  });
}
