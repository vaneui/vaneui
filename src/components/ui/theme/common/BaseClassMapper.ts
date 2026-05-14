import { CategoryProps } from "../../props";

export abstract class BaseClassMapper {
  abstract getClasses(extractedKeys: CategoryProps): string[];
}
