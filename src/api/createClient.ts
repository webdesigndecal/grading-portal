import { createClient } from '@supabase/supabase-js';
import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv';

dotenv.config();

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    'No Supabase environment variables detected, please make sure they are in place!',
  );
}

if (
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY ||
  !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
) {
  throw new Error(
    'No AWS environment variables detected, please make sure they are in place!',
  );
}

export const s3 = new S3Client({
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);