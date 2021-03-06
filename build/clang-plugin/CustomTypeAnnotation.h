/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef CustomTypeAnnotation_h__
#define CustomTypeAnnotation_h__

#include "CustomAttributes.h"
#include "plugin.h"
#include "llvm/ADT/BitmaskEnum.h"

class CustomTypeAnnotation {
  enum ReasonKind {
    RK_None,
    RK_Direct,
    RK_ArrayElement,
    RK_BaseClass,
    RK_Field,
    RK_TemplateInherited,
    RK_Implicit,
  };
  struct AnnotationReason {
    QualType Type;
    ReasonKind Kind;
    const FieldDecl *Field;
    std::string ImplicitReason;

    bool valid() const { return Kind != RK_None; }
  };
  typedef DenseMap<void *, AnnotationReason> ReasonCache;

  CustomAttributes Attribute;
  const char *Pretty;
  ReasonCache Cache;

public:
  CustomTypeAnnotation(CustomAttributes Attribute, const char *Pretty)
      : Attribute(Attribute), Pretty(Pretty){};

  virtual ~CustomTypeAnnotation() {}

  // Checks if this custom annotation "effectively affects" the given type.
  bool hasEffectiveAnnotation(QualType T) {
    return directAnnotationReason(T).valid();
  }
  void dumpAnnotationReason(BaseCheck &Check, QualType T, SourceLocation Loc);

  void reportErrorIfPresent(BaseCheck &Check, QualType T, SourceLocation Loc,
                            const char *Error, const char *Note) {
    if (hasEffectiveAnnotation(T)) {
      Check.diag(Loc, Error, DiagnosticIDs::Error) << T;
      Check.diag(Loc, Note, DiagnosticIDs::Note);
      dumpAnnotationReason(Check, T, Loc);
    }
  }

private:
  AnnotationReason directAnnotationReason(QualType T);
  AnnotationReason tmplArgAnnotationReason(ArrayRef<TemplateArgument> Args);

protected:
  // Flags specifying which properties of the underlying type we want to visit.
  enum VisitFlags {
    VISIT_NONE = 0,
    VISIT_FIELDS = 1,
    VISIT_TMPL_ARGS = 2,
    VISIT_BASES = 4,
    LLVM_MARK_AS_BITMASK_ENUM(VISIT_BASES)
  };

  // Allow subclasses to apply annotations for reasons other than a direct
  // annotation. A non-empty string return value means that the object D is
  // annotated, and should contain the reason why.
  //
  // The subclass may also modify `VisitFlags` to change what properties of the
  // type will be inspected to skip inspecting fields, force template arguments
  // to be inspected, etc.
  virtual std::string getImplicitReason(const TagDecl *D,
                                        VisitFlags &Flags) const {
    return "";
  }
};

extern CustomTypeAnnotation StackClass;
extern CustomTypeAnnotation GlobalClass;
extern CustomTypeAnnotation NonHeapClass;
extern CustomTypeAnnotation HeapClass;
extern CustomTypeAnnotation NonTemporaryClass;
extern CustomTypeAnnotation TemporaryClass;
extern CustomTypeAnnotation StaticLocalClass;

#endif
