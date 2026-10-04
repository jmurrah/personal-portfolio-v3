import java from '@/assets/icons/tech/java.png';
import python from '@/assets/icons/tech/python.png';
import typescript from '@/assets/icons/tech/typescript.png';
import spring from '@/assets/icons/tech/spring.png';
import angular from '@/assets/icons/tech/angular.png';
import oracle from '@/assets/icons/tech/oracle.png';
import azure from '@/assets/icons/tech/azure.png';
import mongodb from '@/assets/icons/tech/mongodb.png';
import docker from '@/assets/icons/tech/docker.png';
import shell from '@/assets/icons/tech/shell.png';
import github from '@/assets/icons/tech/github.png';
import fastapi from '@/assets/icons/tech/fastapi.png';
import next from '@/assets/icons/tech/next.png';
import supabase from '@/assets/icons/tech/supabase.png';
import aws from '@/assets/icons/tech/aws.png';
import postman from '@/assets/icons/tech/postman.png';

export const TECHNOLOGY_ICONS = {
  Java: java,
  Python: python,
  TypeScript: typescript,
  'Spring Boot': spring,
  Angular: angular,
  'Oracle SQL': oracle,
  'Microsoft Azure': azure,
  MongoDB: mongodb,
  Docker: docker,
  Shell: shell,
  GitHub: github,
  FastAPI: fastapi,
  'Next.js': next,
  Supabase: supabase,
  AWS: aws,
  Postman: postman,
} as const;

export type TechnologyName = keyof typeof TECHNOLOGY_ICONS;
