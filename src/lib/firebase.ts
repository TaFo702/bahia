import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { MenuItem } from '../types';
import { INITIAL_MENU_ITEMS } from '../data/menu';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

// Firebase configuration loaded from our provisioned applet setup
const firebaseConfig = {
  apiKey: "AIzaSyCkqu3_poJ5p2eSG6fIuZBe5y16tTpGfSs",
  authDomain: "gen-lang-client-0896148555.firebaseapp.com",
  projectId: "gen-lang-client-0896148555",
  storageBucket: "gen-lang-client-0896148555.firebasestorage.app",
  messagingSenderId: "977382376587",
  appId: "1:977382376587:web:e01f28f0a80d4363d9008e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the dedicated database ID provided in config
export const db = getFirestore(app, "ai-studio-remix2bahiagurme-0abfb19f-c6f4-42db-8d8f-7d03e8133279");

const initialIdsOrder = INITIAL_MENU_ITEMS.map((item) => item.id);

/**
 * Standard error formatter for AI Studio platform diagnostics.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Sorts menu items to preserve the exact curated order from the initial menu.
 */
export const sortMenu = (items: MenuItem[]): MenuItem[] => {
  return [...items].sort((a, b) => {
    const indexA = initialIdsOrder.indexOf(a.id);
    const indexB = initialIdsOrder.indexOf(b.id);
    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;
    return posA - posB;
  });
};

/**
 * Seeds initial menu items to Firestore database if it is empty.
 */
export const seedDatabase = async (): Promise<void> => {
  const path = 'menu_items';
  try {
    const batch = writeBatch(db);
    INITIAL_MENU_ITEMS.forEach((item) => {
      const docRef = doc(db, 'menu_items', item.id);
      batch.set(docRef, item);
    });
    await batch.commit();
    console.log('Firestore seeded successfully with initial menu items.');
  } catch (error) {
    console.error('Failed to seed database:', error);
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

/**
 * Automatically migrates existing Firestore menu items if they are outdated.
 */
export const runAutoMigrationIfNeeded = async (items: MenuItem[]): Promise<void> => {
  try {
    const kofteTabagi = items.find(i => i.id === 'kofte_tabagi');
    const cheeseBurger = items.find(i => i.id === 'cheese_burger');
    const mantarliBurger = items.find(i => i.id === 'mantarli_burger');
    const kuruEtTabagi = items.find(i => i.id === 'kuru_et_tabagi');
    const yogurtlama = items.find(i => i.id === 'yogurtlama');
    const patates = items.find(i => i.id === 'patates');
    const tulumSosluPatates = items.find(i => i.id === 'tulum_soslu_patates');
    const citirTavuk = items.find(i => i.id === 'citir_tavuk');
    const salata = items.find(i => i.id === 'salata');
    const fuseTea = items.find(i => i.id === 'fuse_tea');

    const batch = writeBatch(db);
    let needsCommit = false;

    // Check cheese_burger
    if (cheeseBurger && (cheeseBurger.description.includes('ketçap') || cheeseBurger.ingredients.includes('Ketçap'))) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'cheese_burger');
      if (target) {
        batch.update(doc(db, 'menu_items', 'cheese_burger'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check mantarli_burger
    if (mantarliBurger && (mantarliBurger.description.includes('trüflü') || mantarliBurger.ingredients.includes('Trüflü Mayonez') || mantarliBurger.description.includes('trüf'))) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'mantarli_burger');
      if (target) {
        batch.update(doc(db, 'menu_items', 'mantarli_burger'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check kofte_tabagi
    if (kofteTabagi && (kofteTabagi.name === 'KÖFTE TABAĞI' || kofteTabagi.description.includes('(6 adet)'))) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'kofte_tabagi');
      if (target) {
        batch.update(doc(db, 'menu_items', 'kofte_tabagi'), {
          name: target.name,
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check kuru_et_tabagi
    if (kuruEtTabagi && !kuruEtTabagi.description.includes('Sadece kuru et ve kaymak')) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'kuru_et_tabagi');
      if (target) {
        batch.update(doc(db, 'menu_items', 'kuru_et_tabagi'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check yogurtlama
    if (yogurtlama && !yogurtlama.description.includes('Sadece patates ve sarımsaklı')) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'yogurtlama');
      if (target) {
        batch.update(doc(db, 'menu_items', 'yogurtlama'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check patates
    if (patates && !patates.description.includes('Sade, üstünde herhangi bir')) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'patates');
      if (target) {
        batch.update(doc(db, 'menu_items', 'patates'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check tulum_soslu_patates
    if (tulumSosluPatates && !tulumSosluPatates.description.includes('Erzincan tulum')) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'tulum_soslu_patates');
      if (target) {
        batch.update(doc(db, 'menu_items', 'tulum_soslu_patates'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check citir_tavuk
    if (citirTavuk && (citirTavuk.description.includes('ballı hardal') || citirTavuk.ingredients.includes('Ballı Hardal Sos'))) {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'citir_tavuk');
      if (target) {
        batch.update(doc(db, 'menu_items', 'citir_tavuk'), {
          description: target.description,
          ingredients: target.ingredients
        });
        needsCommit = true;
      }
    }

    // Check salata
    if (salata && salata.name === 'SALATA') {
      const target = INITIAL_MENU_ITEMS.find(i => i.id === 'salata');
      if (target) {
        batch.update(doc(db, 'menu_items', 'salata'), {
          name: target.name
        });
        needsCommit = true;
      }
    }

    // Check fuse_tea price
    if (fuseTea && fuseTea.price !== 150) {
      batch.update(doc(db, 'menu_items', 'fuse_tea'), {
        price: 150.00
      });
      needsCommit = true;
    }

    if (needsCommit) {
      await batch.commit();
      console.log('Automated menu data migration completed successfully.');
    }
  } catch (err) {
    console.error('Error during auto menu migration:', err);
  }
};

/**
 * Subscribes to real-time menu updates from Firestore.
 * Automatically seeds the database if no items exist.
 */
export const subscribeToMenu = (
  onUpdate: (items: MenuItem[]) => void,
  onError: (error: any) => void
) => {
  const path = 'menu_items';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.warn('Firestore menu_items collection is empty. Seeding initial items...');
        try {
          await seedDatabase();
        } catch (err) {
          onError(err);
        }
      } else {
        const items: MenuItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as MenuItem;
          let imageUrl = data.imageUrl;
          if (!imageUrl || imageUrl.includes('bahia_burger') || imageUrl.includes('tulum_patates') || imageUrl.includes('/assets/')) {
            if (docSnap.id === 'tulum_soslu_patates') {
              imageUrl = 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80';
            } else {
              imageUrl = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
            }
          }
          items.push({ id: docSnap.id, ...data, imageUrl } as MenuItem);
        });
        const sorted = sortMenu(items);
        onUpdate(sorted);
        // Silently run auto-migration if any item contains old content
        runAutoMigrationIfNeeded(sorted);
      }
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (formattedErr) {
        onError(formattedErr);
      }
    }
  );
};

/**
 * Updates individual fields of a menu item in Firestore.
 */
export const updateMenuItemInFirestore = async (
  id: string,
  updatedFields: Partial<MenuItem>
): Promise<void> => {
  const path = `menu_items/${id}`;
  try {
    const docRef = doc(db, 'menu_items', id);
    await updateDoc(docRef, updatedFields);
  } catch (error) {
    console.error(`Failed to update menu item ${id}:`, error);
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

/**
 * Resets all menu items in Firestore back to their initial defaults.
 */
export const resetMenuInFirestore = async (): Promise<void> => {
  const path = 'menu_items';
  try {
    const colRef = collection(db, path);
    const snapshot = await getDocs(colRef);
    const batch = writeBatch(db);
    
    // Delete existing documents first to ensure a clean state
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    // Set all initial menu items
    INITIAL_MENU_ITEMS.forEach((item) => {
      const docRef = doc(db, 'menu_items', item.id);
      batch.set(docRef, item);
    });
    
    await batch.commit();
    console.log('Firestore menu reset to original defaults successfully.');
  } catch (error) {
    console.error('Failed to reset menu in Firestore:', error);
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};
